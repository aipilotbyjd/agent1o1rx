# Node Types API Documentation

## Base URL

```
{{base_url}}/api/v1
```

## Authentication

All endpoints require authentication via Bearer token in Authorization header.

---

## Nodes

### List Nodes

```
GET /nodes
```

**Description:** List all available node types with their configuration schemas.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| search | string | Search by name or description |
| category | string | Filter by category slug |

**Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Nodes retrieved successfully.",
	"data": [
		{
			"id": "uuid",
			"type": "ai.agent",
			"name": "AI Agent",
			"description": "Autonomous AI agent that decides which tools to use",
			"icon": "sparkles",
			"color": "#7C3AED",
			"node_kind": "action",
			"config_schema": {
				"type": "object",
				"properties": {
					"provider": {
						"type": "string",
						"enum": ["openai", "anthropic", "gemini"],
						"default": "openai"
					},
					"model": {
						"type": "string",
						"default": "gpt-4o"
					},
					"system_prompt": {
						"type": "string"
					},
					"tools": {
						"type": "array",
						"items": { "type": "string" }
					}
				},
				"required": ["system_prompt", "tools"]
			},
			"input_schema": {
				"type": "object",
				"properties": {
					"prompt": { "type": "string" }
				},
				"required": ["prompt"]
			},
			"output_schema": {
				"type": "object",
				"properties": {
					"response": { "type": "string" }
				}
			},
			"credential_type": null,
			"cost_hint_usd": 0.05,
			"latency_hint_ms": 15000,
			"is_active": true,
			"is_premium": true,
			"category": {
				"id": "uuid",
				"name": "AI",
				"slug": "ai",
				"description": "Artificial intelligence nodes",
				"icon": "cpu-chip",
				"color": "#8B5CF6"
			}
		}
	]
}
```

---

### Get Node

```
GET /nodes/{node_id}
```

**Description:** Get details of a specific node type including full configuration schema.

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| node_id | string | Node type identifier (e.g., "ai.agent") |

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Node retrieved successfully.",
  "data": {
    "id": "uuid",
    "type": "ai.agent",
    "name": "AI Agent",
    "description": "...",
    "icon": "sparkles",
    "color": "#7C3AED",
    "node_kind": "action",
    "config_schema": { ... },
    "input_schema": { ... },
    "output_schema": { ... },
    "credential_type": null,
    "cost_hint_usd": 0.05,
    "latency_hint_ms": 15000,
    "is_active": true,
    "is_premium": true,
    "category": { ... }
  }
}
```

---

## Node Categories

### List Categories

```
GET /node-categories
```

**Description:** List all node categories with node counts.

**Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Node categories retrieved successfully.",
	"data": [
		{
			"id": "uuid",
			"name": "Triggers",
			"slug": "triggers",
			"description": "Starting points for workflows",
			"icon": "bolt",
			"color": "#F59E0B",
			"sort_order": 1,
			"nodes_count": 3
		},
		{
			"id": "uuid",
			"name": "AI",
			"slug": "ai",
			"description": "Artificial intelligence nodes",
			"icon": "cpu-chip",
			"color": "#8B5CF6",
			"sort_order": 2,
			"nodes_count": 11
		}
	]
}
```

---

### Get Category

```
GET /node-categories/{category_id}
```

**Description:** Get a category with all its nodes.

**URL Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category_id | string | Category slug (e.g., "ai") |

**Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Node category retrieved successfully.",
  "data": {
    "id": "uuid",
    "name": "Triggers",
    "slug": "triggers",
    "description": "Starting points for workflows that fire on events or schedules",
    "icon": "bolt",
    "color": "#F59E0B",
    "sort_order": 1,
    "nodes_count": 3,
    "nodes": [
      {
        "id": "uuid",
        "type": "trigger.manual",
        "name": "Manual Trigger",
        "description": "Starts the workflow manually by the user",
        "icon": "hand-raised",
        "color": "#F59E0B",
        "node_kind": "trigger",
        "config_schema": { ... },
        "input_schema": null,
        "output_schema": { ... }
      }
    ]
  }
}
```

---

## Credential Types

### List Credential Types

```
GET /credential-types
```

**Description:** List all available credential types for external integrations.

**Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Credential types retrieved successfully.",
	"data": [
		{
			"id": "airtable",
			"name": "Airtable",
			"description": "Connect to Airtable bases",
			"fields": [{ "name": "token", "type": "string", "required": true }]
		}
	]
}
```

---

### Get Credential Type

```
GET /credential-types/{credential_type_id}
```

**Description:** Get a credential type with its configuration fields.

**Response:**

```json
{
	"success": true,
	"statusCode": 200,
	"message": "Credential type retrieved successfully.",
	"data": {
		"id": "airtable",
		"name": "Airtable",
		"description": "Connect to Airtable bases",
		"fields": [
			{
				"name": "token",
				"type": "string",
				"required": true,
				"description": "Personal access token"
			}
		]
	}
}
```

---

## Data Structures

### Node Type

| Field           | Type               | Description                          |
| --------------- | ------------------ | ------------------------------------ |
| id              | string             | UUID of the node type                |
| type            | string             | Unique identifier (e.g., "ai.agent") |
| name            | string             | Display name                         |
| description     | string             | Description of what the node does    |
| icon            | string             | Icon identifier/name                 |
| color           | string             | Hex color code                       |
| node_kind       | string             | "trigger" or "action"                |
| config_schema   | JSONSchema         | Configuration options for the node   |
| input_schema    | JSONSchema \| null | Expected input format                |
| output_schema   | JSONSchema \| null | Output format                        |
| credential_type | string \| null     | Required credential type             |
| cost_hint_usd   | number \| null     | Estimated cost per run               |
| latency_hint_ms | number \| null     | Expected execution time              |
| is_active       | boolean            | Whether node is available            |
| is_premium      | boolean            | Requires premium plan                |
| category        | object             | Parent category info                 |

### JSON Schema Format

The `config_schema`, `input_schema`, and `output_schema` use simplified JSON Schema:

```json
{
	"type": "object",
	"properties": {
		"field_name": {
			"type": "string",
			"enum": ["option1", "option2"],
			"default": "option1",
			"description": "Field description",
			"minimum": 0,
			"maximum": 100
		}
	},
	"required": ["field_name"]
}
```

**Supported types:** `string`, `number`, `integer`, `boolean`, `array`, `object`

---

## Categories Overview

| Category      | Slug          | Description                   | Nodes |
| ------------- | ------------- | ----------------------------- | ----- |
| Triggers      | triggers      | Starting points for workflows | 3     |
| AI            | ai            | Artificial intelligence nodes | 11    |
| Flow Control  | flow-control  | Control execution flow        | 9     |
| Data          | data          | Transform and manipulate data | 17    |
| Communication | communication | Send messages                 | 5     |
| HTTP & APIs   | http-apis     | Make HTTP requests            | 3     |
| Utility       | utility       | Helper nodes                  | 5     |
| Storage       | storage       | File storage operations       | 3     |
| Debug         | debug         | Logging and debugging         | 1     |
