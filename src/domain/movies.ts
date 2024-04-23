import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
@Entity({ name: "movies" })
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @Column({ name: "title", nullable: false })
  title: string;
  @Column({ name: "director", nullable: false })
  director: string;
  @Column({ name: "year", nullable: false })
  year: string;
  @Column({ name: "gender", nullable: false })
  gender: string;
  @Column({ name: "country_of_origin", nullable: false })
  countryOfOrigin: string;
  @Column({ name: "language", nullable: false })
  language: string;
  @Column({ name: "duration", nullable: false })
  duration: number;
  @CreateDateColumn({ name: "created_at" })
  createdAt: string;
  @UpdateDateColumn({ name: "updated_at" })
  updateAt: string;
}

