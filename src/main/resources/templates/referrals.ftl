<html>
<head></head>
<body>
	<p>Dear All,</p>
	<p>Candidate referred with the respective details:</p>
	<table border="1" style="border:2px solid black">
		<tbody>
			<tr bgcolor=\"#FFEDB9\">
				<td>Candidate Name</td>
				<td>Email</td>
				<td>Phone</td>
				<td>Skill Id</td>
				<td>Experience</td>
				<td>Referred By(Id)</td>
				<td>Referred By(Name)</td>
				
			</tr>
			<tr>
				<td>${referralList.getCandidateName()}</td>
				<td>${referralList.getEmail()}</td>
				<td>${referralList.getPhone()}</td>
				<td>${referralList.getSkill().getSkillName()}</td>
				<td>${referralList.getExperience()}</td>
				<td>${referralList.getReferredById()}</td>
				<td>${referralList.getReferredByName()}</td>
				
			</tr>
		</tbody>
	</table>
	
	<p>Regards,</p>
	<p>JPMC Team,</p>
</body>
</html>



