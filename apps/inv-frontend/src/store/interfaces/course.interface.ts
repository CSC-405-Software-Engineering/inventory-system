export enum CourseType {
    COMPULSORY = 'compulsory',
    ELECTIVE = 'elective',
  }

export interface CourseProps {
    _id?: any;
    courseCode: string;
    courseTitle: string;
    description: string;
    courseType: CourseType;
    unit: number;
    level: number;
    semester: number;
    image?: string;
}