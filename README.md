# Jobboard

Job curation web server

# Usage

The web server is accessible via host:

```bash
TBD
```

# API Endpoints

## GET api/jobs

Create a new job posting

### Query Parameters

| field | type     | description |
| ----- | -------- | ----------- |
| page  | `string` |             |

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Job name here",
      "company": "Backend Engineer",
      ...
    },
    ...
  ]
}
```

| code | description         |
| ---- | ------------------- |
| 400  | check error message |

```json
{
  "message": "error message here"
}
```

## GET api/jobs/:jobId

Create a new job posting

### Path Parameters

| field | type     | description |
| ----- | -------- | ----------- |
| jobId | `string` |             |

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  {
    "id": 1,
    "title": "Job name here",
    "company": "Backend Engineer",
    ...
  }
}
```

| code | description         |
| ---- | ------------------- |
| 400  | check error message |

```json
{
  "message": "error message here"
}
```

## POST api/jobs

Create a new job posting

### Body Parameters

Parameter content type: `application/json`

| field   | type     | description         |
| ------- | -------- | ------------------- |
| title   | `json`   | job title           |
| company | `string` | name of the company |

Example Body

```json
{
  "title": "Job name here",
  "company": "Backend Engineer"
}
```

### Responses

| code | description |
| ---- | ----------- |
| 200  | success     |

```json
{
  "jobId": "job_123123"
}
```

| code | description                          |
| ---- | ------------------------------------ |
| 400  | job not created, check error message |

```json
{
  "message": "error message here"
}
```

## GET api/mods/jobs/approve/:jobId

Approve a job posting

### Query Parameters

| field  | type     | description                             |
| ------ | -------- | --------------------------------------- |
| authId | `string` | base-64 encoded jwt with 48-hour expiry |

### Responses

| code | description    |
| ---- | -------------- |
| 200  | success        |
| 400  | request failed |

```json
{
  "message": "error message here"
}
```

## GET api/mods/jobs/mark-as-spam/:jobId

Mark as spam job posting

### Query Parameters

| field  | type     | description                             |
| ------ | -------- | --------------------------------------- |
| authId | `string` | base-64 encoded jwt with 48-hour expiry |

### Responses

| code | description    |
| ---- | -------------- |
| 200  | success        |
| 400  | request failed |

```json
{
  "message": "error message here"
}
```
