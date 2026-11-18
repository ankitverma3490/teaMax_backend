import prisma from '../utils/prisma';
import { hashPassword } from '../utils/password';
import { AppError } from '../middleware/error.middleware';
import { Role } from '@prisma/client';

export interface CreateTeamMemberInput {
  name: string;
  email: string;
  password: string;
  role?: Role;
  designation?: string;
  department?: string;
  phone?: string;
  permissions?: string[];
  status?: string;
}

export interface UpdateTeamMemberInput {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  designation?: string;
  department?: string;
  phone?: string;
  permissions?: string[];
  status?: string;
}

export class TeamService {
  /**
   * List all team members / employees
   */
  static async getAllTeamMembers() {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        designation: true,
        department: true,
        phone: true,
        avatar: true,
        permissions: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  /**
   * Get single team member by ID
   */
  static async getTeamMemberById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        designation: true,
        department: true,
        phone: true,
        avatar: true,
        permissions: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new AppError('Team member not found.', 404);
    }

    return user;
  }

  /**
   * Create a new team member / employee
   */
  static async createTeamMember(data: CreateTeamMemberInput) {
    const normalizedEmail = data.email.trim().toLowerCase();

    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      throw new AppError('A team member with this email address already exists.', 409);
    }

    if (!data.password || data.password.length < 6) {
      throw new AppError('Password must be at least 6 characters long.', 400);
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        name: data.name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: data.role || Role.STAFF,
        designation: data.designation?.trim() || null,
        department: data.department?.trim() || null,
        phone: data.phone?.trim() || null,
        permissions: data.permissions || [],
        status: data.status || 'active',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        designation: true,
        department: true,
        phone: true,
        avatar: true,
        permissions: true,
        status: true,
        createdAt: true,
      },
    });

    return user;
  }

  /**
   * Update an existing team member
   */
  static async updateTeamMember(id: string, data: UpdateTeamMemberInput) {
    const existing = await prisma.user.findUnique({ where: { id } });

    if (!existing) {
      throw new AppError('Team member not found.', 404);
    }

    const updateData: any = {};

    if (data.name !== undefined) updateData.name = data.name.trim();
    if (data.designation !== undefined) updateData.designation = data.designation.trim();
    if (data.department !== undefined) updateData.department = data.department.trim();
    if (data.phone !== undefined) updateData.phone = data.phone.trim();
    if (data.role !== undefined) updateData.role = data.role;
    if (data.permissions !== undefined) updateData.permissions = data.permissions;
    if (data.status !== undefined) updateData.status = data.status;

    if (data.email) {
      const normalizedEmail = data.email.trim().toLowerCase();
      if (normalizedEmail !== existing.email) {
        const emailTaken = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });
        if (emailTaken) {
          throw new AppError('This email is already in use by another user.', 409);
        }
        updateData.email = normalizedEmail;
      }
    }

    if (data.password && data.password.trim().length > 0) {
      if (data.password.length < 6) {
        throw new AppError('Password must be at least 6 characters long.', 400);
      }
      updateData.passwordHash = await hashPassword(data.password);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        designation: true,
        department: true,
        phone: true,
        avatar: true,
        permissions: true,
        status: true,
        updatedAt: true,
      },
    });

    return updated;
  }

  /**
   * Toggle active/inactive status
   */
  static async toggleStatus(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new AppError('You cannot deactivate your own account.', 400);
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError('Team member not found.', 404);
    }

    const newStatus = existing.status === 'active' ? 'inactive' : 'active';

    const updated = await prisma.user.update({
      where: { id },
      data: { status: newStatus },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        designation: true,
      },
    });

    return updated;
  }

  /**
   * Delete team member
   */
  static async deleteTeamMember(id: string, currentUserId: string) {
    if (id === currentUserId) {
      throw new AppError('You cannot delete your own account.', 400);
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      throw new AppError('Team member not found.', 404);
    }

    // Protect last Super Admin
    if (existing.role === Role.SUPER_ADMIN || existing.role === Role.ADMIN) {
      const superAdminCount = await prisma.user.count({
        where: {
          role: { in: [Role.SUPER_ADMIN, Role.ADMIN] },
        },
      });
      if (superAdminCount <= 1) {
        throw new AppError('Cannot delete the only remaining Super Administrator.', 400);
      }
    }

    await prisma.user.delete({ where: { id } });

    return { message: 'Team member deleted successfully.' };
  }
}
