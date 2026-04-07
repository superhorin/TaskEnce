import { Difficulty, Duration, MembershipStatus, Priority, PrismaClient, TeamRole, ThreadStatus, TaskType, ActionType } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { Action } from "rxjs/internal/scheduler/Action";

dotenv.config();

const	connectionString = process.env.DATABASE_URL;

const	pool = new Pool({ connectionString });
const	adapter = new PrismaPg(pool);

const	prisma = new PrismaClient( { adapter } );

async function	main() {
	console.log('🌱 シードデータの投入を開始します...');

	await	prisma.taskAction.deleteMany();
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
			title: 'develop login page',
			status: ThreadStatus.OPEN,
			priority: Priority.IMPORTANT,
			members: { connect: [{ id: alice.id }, { id: bob.id }] },
			teamId:	devTeam.id,
		},
	});

	const	msg1 = await prisma.message.create({
		data: {
			text: '今のログイン画面、少し使いづらいという声があります。',
			senderId: alice.id,
			chatThreadId: designThread.id
		},
	});
	const	msg2 = await prisma.message.create({
		data: {
			text: '確かに。新しいデザイン案を作ってみましょうか？',
			senderId: bob.id,
			chatThreadId: designThread.id
		},
	});

	const	designTask = await prisma.task.create({
		data: {
			title: 'ログイン画面のUIモックアップ作成',
			description: 'Figmaで3パターンほど提案する',
			type:	TaskType.DEFAULT,
			difficulty: Difficulty.CHALLENGING,
			duration: Duration.MARATHON,
			priority: Priority.IMPORTANT,
			progress: 50,
			authorId: alice.id,
			assigneeId: bob.id,
			teamId: devTeam.id,
			chatThreadId: designThread.id,
			contributors: { connect: [{ id: alice.id }, { id: bob.id }] },
		},
	});

	await	prisma.taskAction.createMany({
		data: [
			{
				taskId:		designTask.id,
				actorId:	alice.id,
				actionType:	ActionType.CREATED,
				message:	'Bobさん、デザインの草案作成をお願いします！',
				passedToId:	bob.id,
				createdAt:	new Date(Date.now() - 1000 * 60 * 60 * 2),
			},
			{
				taskId:		designTask.id,
				actorId:	bob.id,
				actionType:	ActionType.PROGRESSED,
				message:	'競合アプリのUIリサーチを開始しました。いくつかスクショを集めています。',
				passedToId:	bob.id,
				createdAt:	new Date(Date.now() - 1000 * 60 * 60 * 1),
			},
			{
				taskId:		designTask.id,
				actorId:	bob.id,
				actionType:	ActionType.PASSED,
				message:	'草案を3パターン作成しました。Figmaのリンクを貼ります。Aliceさん、確認をお願いします！',
				passedToId:	alice.id,
				createdAt:	new Date(),
			},
		]
	});

	await	prisma.message.create({
		data: {
			text: 'おお！早いですね。確認して後でフィードバック（タスクアクション）を返します。次はコーディングの準備ですね。',
			senderId: bob.id,
			chatThreadId: designThread.id,
		},
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