import { IsDate, IsDateString, IsEnum, IsInt, IsOptional, IsString, Length } from "class-validator";

export enum TaskStatusEnum{
    A_FAZER   = "A_FAZER",
    EM_ANDAMENTO = "EM_ANDAMENTO",
    FEITO = "FEITO"
}

export class TaskDto {
    // @IsString()
    id: string;
       
    @IsString()
    @Length(5, 50)
    title: string;

    @IsString()
    @Length(10, 150)
    description: string;

    @IsEnum(TaskStatusEnum)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface FindAllParameters {
    title: string;    
    status: string;
}

export class TaskRouteParameters {
    @IsString()
    id: string;
  }