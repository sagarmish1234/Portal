<html>
<head></head>
<body>
	<p>Dear All,</p>
	<p>Associate nominated for your Interview Drive:</p>
	<table style='border:2px solid black'>
		<tbody>
			<tr bgcolor=\"#FFEDB9\">
				<td>Associate ID</td>
				<td>Associate Name</td>
				<td>Skill Id</td>
				<td>Availability From</td>
				<td>Availability To</td>
			</tr>
			<tr>
				<td>${panelist.getAssociateId()}</td>
				<td>${panelist.getPanelistName()}</td>
				<td>${panelist.getSkillId()}</td>
				<td>${panelist.getAvailabilityFrom()}</td>
				<td>${panelist.getAvailabilityTo()}</td>
			</tr>
		</tbody>
	</table>
	<p>Regards,</p>
	<p>JPMC Team,</p>
</body>
</html>