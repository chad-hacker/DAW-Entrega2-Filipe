import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1759253463968 implements MigrationInterface {
    name = 'Init1759253463968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`professores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_a651a1844f49c265ab23f3b275\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cpf\` varchar(255) NOT NULL, \`nome\` varchar(255) NOT NULL, \`perfil\` enum ('PROFESSOR', 'ALUNO') NOT NULL, \`email\` varchar(255) NOT NULL, \`senha\` varchar(255) NOT NULL, \`questao\` varchar(255) NULL, \`resposta\` varchar(255) NULL, \`cor_tema\` varchar(255) NULL, UNIQUE INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` (\`cpf\`), UNIQUE INDEX \`IDX_446adfc18b35418aac32ae0b7b\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`alunos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_6bc1f47987043646b21156f066\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`propostas\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`descricao\` text NOT NULL, \`professorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`interesses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`alunoId\` int NULL, \`propostaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`professores\` ADD CONSTRAINT \`FK_a651a1844f49c265ab23f3b275b\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`alunos\` ADD CONSTRAINT \`FK_6bc1f47987043646b21156f0665\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`propostas\` ADD CONSTRAINT \`FK_a53112423f2b92967ee1671e3a2\` FOREIGN KEY (\`professorId\`) REFERENCES \`professores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interesses\` ADD CONSTRAINT \`FK_6eb6c3625df3144f8ecdab21a4e\` FOREIGN KEY (\`alunoId\`) REFERENCES \`alunos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`interesses\` ADD CONSTRAINT \`FK_de03118f29c6fbe70acca253adf\` FOREIGN KEY (\`propostaId\`) REFERENCES \`propostas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`interesses\` DROP FOREIGN KEY \`FK_de03118f29c6fbe70acca253adf\``);
        await queryRunner.query(`ALTER TABLE \`interesses\` DROP FOREIGN KEY \`FK_6eb6c3625df3144f8ecdab21a4e\``);
        await queryRunner.query(`ALTER TABLE \`propostas\` DROP FOREIGN KEY \`FK_a53112423f2b92967ee1671e3a2\``);
        await queryRunner.query(`ALTER TABLE \`alunos\` DROP FOREIGN KEY \`FK_6bc1f47987043646b21156f0665\``);
        await queryRunner.query(`ALTER TABLE \`professores\` DROP FOREIGN KEY \`FK_a651a1844f49c265ab23f3b275b\``);
        await queryRunner.query(`DROP TABLE \`interesses\``);
        await queryRunner.query(`DROP TABLE \`propostas\``);
        await queryRunner.query(`DROP INDEX \`REL_6bc1f47987043646b21156f066\` ON \`alunos\``);
        await queryRunner.query(`DROP TABLE \`alunos\``);
        await queryRunner.query(`DROP INDEX \`IDX_446adfc18b35418aac32ae0b7b\` ON \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`IDX_ebebcaef8457dcff6e6d69f17b\` ON \`usuarios\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
        await queryRunner.query(`DROP INDEX \`REL_a651a1844f49c265ab23f3b275\` ON \`professores\``);
        await queryRunner.query(`DROP TABLE \`professores\``);
    }

}
