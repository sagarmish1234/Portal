<html>
<head></head>
<body>
	<p>Dear All,</p>
	<p>Assignment for following associates are ending in next ${assignmentLimitDays} days:</p>
	<table border="1" style="border:2px solid black">
		<tbody>
		
			<#list asgnmtEndingList>
				<tr>
					<td>Associate ID</td>
					<td>Associate Name</td>
					<td>Project ID</td>
					<td>Project Name</td>
					<td>LOB</td>
					<td>Current assignment End Date</td>
				</tr>
			<#items as asgnmtAssociate>
				<tr>
					<td>XXXX</td>
					<td>XXXX</td>
					<td>XXXX</td>
					<td>XXXX</td>
					<td>XXXX</td>
					<td>${asgnmtAssociate.getAssignmentEnddate()?string('dd.MM.yyyy')}</td>
				</tr>
			</#items>
				
			<#else>
				<p>No Assignments ending in next ${assignmentLimitDays} days
			</#list>
		</tbody>
	</table>
	<p>Regards,</p>
	<p>JPMC Team,</p>
</body>
</html>