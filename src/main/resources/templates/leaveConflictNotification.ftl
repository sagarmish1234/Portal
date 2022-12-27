<html>
    <head></head>
    <body>
        <p>Dear ${manager},</p>
        <p>Associate applied for leave belongs to a critical resource group</p>
        <#list leaveListMap as key,value>
            <h5>Leave date - ${key.getMonth()} ${key.getDay()}, ${key.getYear()}</h5>
            <table style="width : 100%">
                <tr>
                    <th style="background-color: #f8bd83;
                                 height: 30px;
                                 border-right: 1px solid #fff;
                                 color: Black;
                                 font-size: 11px;
                                 font-family: Verdana;
                                 text-align: center;">Associate Id</th>
                    <th style="background-color: #f8bd83;
                                 height: 30px;
                                 border-right: 1px solid #fff;
                                 color: Black;
                                 font-size: 11px;
                                 font-family: Verdana;
                                 text-align: center;">Associate Name</th>
                </tr>
                <#list value as user>
                    <tr style="font-family: Verdana;
                                                         font-size: 11px; /*text-decoration: none;*/
                                                         vertical-align: middle;
                                                         text-align: left;
                                                         background-color: #ffedd9;
                                                         border-color: #f0ab96;
                                                         border-style: solid;
                                                         border-width: 1px;">
                        <td>${user.getAssociateID()?c}</td>
                        <td>${user.getAssociateName()}</td>
                    </tr>
                </#list>
            </table>
        </#list>
        <p>Regards,</p>
        <p>JPMC Team,</p>
    </body>
</html>