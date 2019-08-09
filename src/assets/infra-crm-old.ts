export const infra = {
	"name":"business name",
	"address":"address",
	"users":[
		{
			"username":"email here",
			"user_type":"admin"
		}
	],
	"config":{
		"infra":{
			"process":[
				{
					"sort":1,
					"name":"lead",
					"icon":"arrow-right",
					"label":"Leads",
					"fields":[
						{
							"type":"text",
							"name":"full_name",
							"label":"Customer Name",
							"required":true,
							"default_value":"",
							"placeholder":"Enter name here",
							"max-length":100,
							"sort":1
						}
					]
				},
				{
					"sort":2,
					"name":"quote",
					"icon":"file-text-o",
					"label":"Quotes",
					"fields":[
						{
							"type":"textarea",
							"name":"description",
							"label":"Description",
							"required":true,
							"default_value":"",
							"placeholder":"Enter description",
							"max-length":100,
							"sort":1
						}
					]
				},
				{
					"sort":3,
					"name":"order",
					"icon":"check-square-o",
					"label":"Orders",
					"fields":[
						{
							"type":"select",
							"name":"user_type",
							"label":"User Type",
							"required":true,
							"options":[{"name":"Admin","label":"Admin"},{"name":"User","label":"User"}],
							"default_value":"User",
							"sort":1
						}
					]
				},
				{
					"sort":4,
					"name":"job-card",
					"icon":"industry",
					"label":"Job Cards",
					"fields":[
						{
							"type":"checkbox",
							"name":"active",
							"label":"Activate This Lead",
							"default_value":true,
							"sort":1
						}
					]
				},
				{
					"sort":5,
					"name":"dispatch",
					"icon":"truck",
					"label":"Dispatches",
					"fields":[
						{
							"type":"checkbox",
							"name":"active",
							"label":"Activate This Lead",
							"default_value":true,
							"sort":1
						}
					]
				}
			],
			"acl":[
				{
					"username":"email here",
					"permissions":[
						{
							"step":1,
							"create":true,
							"read":true,
							"update":true,
							"delete":false
						}
					]
				}
			]
		}
	}
};