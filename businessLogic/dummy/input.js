const input=
{
	"0": [{
		"id": 10,
		"title": "House",
		"level": 0,
		"children": [],
		"parent_id": null
	}],
	"1": [{
			"id": 12,
			"title": "Red Roof",
			"level": 1,
			"children": [],
			"parent_id": 10
		},
		{
			"id": 18,
			"title": "Blue Roof",
			"level": 1,
			"children": [],
			"parent_id": 10
		},
		{
			"id": 13,
			"title": "Wall",
			"level": 1,
			"children": [],
			"parent_id": 10
		}
	],
	"2": [{
			"id": 17,
			"title": "Blue Window",
			"level": 2,
			"children": [],
			"parent_id": 12
		},
		{
			"id": 16,
			"title": "Door",
			"level": 2,
			"children": [],
			"parent_id": 13
		},
		{
			"id": 15,
			"title": "Red Window",
			"level": 2,
			"children": [],
			"parent_id": 12
		},
		{
			"id": 21,
			"title": "Orange Window",
			"level": 2,
			"children": [],
			"parent_id": 17
		},
		  {
			"id": 22,
			"title": "Green Window",
			"level": 2,
			"children": [],
			"parent_id": 17
		},
		  {
			"id": 23,
			"title": "Black Window",
			"level": 2,
			"children": [],
			"parent_id": 21
		}
	]
}

module.exports={input}