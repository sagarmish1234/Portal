<html>
<head></head>
<body>
	<p>Dear All,</p>
	<p>Following projects are ending in next ${projectLimitDays} days:</p>
	<table border="1" style="border:2px solid black">
		<tbody>
		
			<#list projectsEndingList>
				<tr>
					<td>Project ID</td>
					<td>Project Name</td>
					<td>LOB</td>
					<td>Project End Date</td>
				</tr>
			<#items as projectId, asgnmtAssociate>
				<tr>
					<td>${projectId}</td>
					<td>XXXX</td>
					<td>XXXX</td>
					<td>${asgnmtAssociate.getProjectEndDate()?string('dd.MM.yyyy')}</td>
				</tr>
			</#items>
				
			<#else>
				<p>No Projects ending in next ${projectLimitDays} days
			</#list>
		</tbody>
	</table>
	<p>Regards,</p>
	<p>JPMC Team,</p>
</body>
</html>