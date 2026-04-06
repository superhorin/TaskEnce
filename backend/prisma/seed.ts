import { Difficulty, Duration, MembershipStatus, Priority, PrismaClient, TeamRole, ThreadStatus } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { application } from "express";
import { connect } from "http2";
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

dotenv.config();

const	connectionString = process.env.DATABASE_URL;

const	pool = new Pool({ connectionString });
const	adapter = new PrismaPg(pool);

const	prisma = new PrismaClient( { adapter } );

async function	main() {
	console.log('🌱 シードデータの投入を開始します...');

	await	prisma.message.deleteMany();
	await	prisma.task.deleteMany();
	await	prisma.chatThread.deleteMany();
	await	prisma.membership.deleteMany();
	await	prisma.team.deleteMany();
	await	prisma.user.deleteMany();

	const	plainPassword = 'password123';
	const	hashedPassword = await bcrypt.hash(plainPassword, 10);

	const	alice = await prisma.user.create({
		data: { name: 'Alice', email: 'alice@example.com', password: hashedPassword, level: 5, exp: 1200 },
	});
	const	bob = await prisma.user.create({
		data: { name: 'Bob', email: 'bob@example.com', password: hashedPassword, level: 3, exp: 450 },
	});
	const charlie = await prisma.user.create({
		data: { name: 'Charlie', email: 'charlie@example.com', password: hashedPassword, level: 1, exp: 0 },
	});

	const	devTeam = await prisma.team.create({
		data: { name: 'Teat Team', level: 2, exp: 3000 },
	});

	await	prisma.membership.createMany({
		data: [
			{ userId: alice.id, teamId: devTeam.id, role: TeamRole.OWNER, status: MembershipStatus.ACTIVE, position: 'Tech Lead', joinedAt: new Date() },
			{ userId: bob.id, teamId: devTeam.id, role: TeamRole.MEMBER, status: MembershipStatus.ACTIVE, position: 'Frontend Engineer', joinedAt: new Date() },
			{ userId: charlie.id, teamId: devTeam.id, role: TeamRole.GUEST, status: MembershipStatus.INVITED },
		],
	});

	const	designThread = await prisma.chatThread.create({
		data: {
			title: 'about design',
			status: ThreadStatus.OPEN,
			priority: Priority.IMPORTANT,
			members: { connect: [{ id: alice.id }, { id: bob.id }] },
		},
	});

	const	msg1 = await prisma.message.create({
		data: { text: '今のログイン画面、少し使いづらいという声があります。', senderId: alice.id, threadId: designThread.id },
	});
	const	msg2 = await prisma.message.create({
		data: { text: '確かに。新しいデザイン案を作ってみましょうか？', senderId: bob.id, threadId: designThread.id },
	});

	const	designTask = await prisma.task.create({
		data: {
			title: 'ログイン画面のUIモックアップ作成',
			description: 'Figmaで3パターンほど提案する',
			difficulty: Difficulty.CHALLENGING,
			duration: Duration.MARATHON,
			priority: Priority.IMPORTANT,
			progress: 0,
			authorId: alice.id,
			assigneeId: bob.id,
			teamId: devTeam.id,
			sourceMessageId: msg2.id,
			contributors: { connect: [{ id: alice.id }, { id: bob.id }] },
		},
	});

	await	prisma.task.create({
		data: {
			title: '競合アプリのUIリサーチ',
			difficulty: Difficulty.SIMPLE,
			duration: Duration.QUICK,
			authorId: bob.id,
			assigneeId: bob.id,
			parentTaskId: designTask.id,
			teamId: devTeam.id,
			contributors: { connect: [{ id: alice.id }, { id: bob.id }] },
		},
	});

	await	prisma.message.create({
		data: { text: '参考になりそうなアプリのスクショを集めました！', senderId: bob.id, taskId: designTask.id },
	});

	console.log('✅ シードデータの投入が完了しました！');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});