import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { fetchTeams } from "@/features/teams/teamSlice";
import { useEffect } from "react";

export const TeamPage = () => {
	const dispatch = useAppDispatch();
	const team = useAppSelector(state => state.team);

	useEffect(() => {
		dispatch(fetchTeams());
	},[dispatch]);

	if (team.loading) {
		return (
			<p>loading....</p>
		)
	}

	return (
		<div>
			<ul>
				{team.members.map((member) => (
					<li key={member.id}>
						<p>{member.team.name}</p>
						<p>{member.position}</p>
						<p>{member.status}</p>
						<p>{member.role}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
