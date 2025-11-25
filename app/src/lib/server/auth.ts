import db from "$lib/db";

export function canEditClass(user: App.Locals["user"], courseId: number) {
    if (!user) return false;

    if (user.role === 3 || user.role === 2) return true;

    // Uniquement si le cours appartient à son diplôme
    if (user.role === 1) {
        const stmt = db.prepare(`SELECT degreeId FROM courses WHERE id = ?`);
        const course = stmt.get(courseId);
        if (!course) return false;

        return course.degreeId === user.degreeId;
    }

    return false;
}

export function canViewDegree(user: App.Locals["user"], degreeId: number) {
    if (!user) return false;
    if(user.role === 3 || user.role === 2) return true;

    if (user.role === 1 || user.role === 0) {
        return degreeId === user.degreeId;
    }
}

export function canEditDegree(user: App.Locals["user"]) {
    if (!user) return false;
    return user.role === 3;
}

export function canEditCourse(user: App.Locals["user"], degreeId: number) {
    if (!user) return false;

    if (user.role === 3 || user.role === 2) return true;

    // Uniquement si le cours appartient à son diplôme
    if (user.role === 1) {
        return degreeId === user.degreeId;
    }

    return false;
}

export function canEditUser(user: App.Locals["user"]) {
    if (!user) return false;
    return user.role === 3;
}