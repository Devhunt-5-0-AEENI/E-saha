import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Niveau } from "./Niveau";
import { Parent } from "./Parent";
import { Maquette } from "./maquette";

@Entity()
export class Enfant{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    firstName:string;

    @Column()
    age:number;

    @Column({nullable: true})
    pin:string;

    @ManyToOne(() => Parent , (user) => user.enfants)
    @JoinColumn({name: 'user_id'})
    parent: Parent;

    @ManyToOne(() => Niveau , niveau => niveau.enfants)
    @JoinColumn({name: 'niveau_id'})
    niveau:Niveau;

    @OneToMany(() =>Maquette , (maquette) => maquette.enfant)
    maquettes:Maquette[];
}