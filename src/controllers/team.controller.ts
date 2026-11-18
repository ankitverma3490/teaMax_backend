import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
import { TeamService } from '../services/team.service';
import { sendSuccess } from '../utils/apiResponse';
import { AppError } from '../middleware/error.middleware';

export class TeamController {
  static async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const team = await TeamService.getAllTeamMembers();
      return sendSuccess(res, team, 'Team members retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const member = await TeamService.getTeamMemberById(id);
      return sendSuccess(res, member, 'Team member details retrieved');
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role, designation, department, phone, permissions, status } = req.body;

      if (!name || !email || !password) {
        throw new AppError('Name, email, and password are required fields.', 400);
      }

      const created = await TeamService.createTeamMember({
        name,
        email,
        password,
        role,
        designation,
        department,
        phone,
        permissions,
        status,
      });

      return sendSuccess(res, created, 'Team member created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const updated = await TeamService.updateTeamMember(id, req.body);
      return sendSuccess(res, updated, 'Team member updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async toggleStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.userId || '';
      const result = await TeamService.toggleStatus(id, currentUserId);
      return sendSuccess(res, result, 'Team member status updated');
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const currentUserId = req.user?.userId || '';
      const result = await TeamService.deleteTeamMember(id, currentUserId);
      return sendSuccess(res, result, 'Team member deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
