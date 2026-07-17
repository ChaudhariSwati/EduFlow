export function serializeUser(user) {
  if (!user) {
    return null
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || '',
  }
}

export function serializeAssignment(assignment) {
  const dto = assignment.toJSON()
  return {
    ...dto,
    id: dto.id || dto._id?.toString(),
    createdBy: dto.createdBy?.toString?.() || dto.createdBy,
  }
}