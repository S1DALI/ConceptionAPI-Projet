// Example: API integration service
// This file shows how to replace mock data with real API calls

/**
 * API Service for MyClasses
 * Replace this with actual API endpoints when ready
 */

const API_BASE = '/api/v1';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'professor' | 'class_representative' | 'admin';
}

export interface Degree {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  degreeId: number;
  description?: string;
}

export interface Class {
  id: number;
  name: string;
  courseId: number;
  link: string;
}

// API Functions
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getUserById(id: number): Promise<User> {
  try {
    const response = await fetch(`${API_BASE}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
}

export async function getDegrees(): Promise<Degree[]> {
  try {
    const response = await fetch(`${API_BASE}/degrees`);
    if (!response.ok) throw new Error('Failed to fetch degrees');
    return await response.json();
  } catch (error) {
    console.error('Error fetching degrees:', error);
    throw error;
  }
}

export async function getCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export async function getCoursesByDegree(degreeId: number): Promise<Course[]> {
  try {
    const response = await fetch(`${API_BASE}/degrees/${degreeId}/courses`);
    if (!response.ok) throw new Error('Failed to fetch courses');
    return await response.json();
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
}

export async function getClasses(): Promise<Class[]> {
  try {
    const response = await fetch(`${API_BASE}/classes`);
    if (!response.ok) throw new Error('Failed to fetch classes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
}

export async function getClassesByCourse(courseId: number): Promise<Class[]> {
  try {
    const response = await fetch(`${API_BASE}/courses/${courseId}/classes`);
    if (!response.ok) throw new Error('Failed to fetch classes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching classes:', error);
    throw error;
  }
}

// Example: How to use in a page
/*
// In src/routes/users/+page.ts
import { getUsers } from '$lib/api';

export async function load({ fetch }) {
  const users = await getUsers();
  return { users };
}

// Then in src/routes/users/+page.svelte
<script>
  export let data;
  let users = $state(data.users);
</script>

<div>
  {#each users as user}
    <p>{user.name}</p>
  {/each}
</div>
*/

