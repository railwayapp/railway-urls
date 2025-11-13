# railway-urls

Generate URLs to Railway.com resources.

## Installation

```bash
npm install railway-urls
```

## Usage

Use the default instance for standard Railway URLs:

```ts
import { railwayUrls } from 'railway-urls';

railwayUrls.project({ projectId: 'abc123' });
// https://railway.com/project/abc123

railwayUrls.projectSettings({
  projectId: 'abc123',
  environmentId: 'prod'
});
// https://railway.com/project/abc123/settings?environmentId=prod
```

Create a custom instance for different base URLs:

```ts
import { RailwayUrls } from 'railway-urls';

const urls = new RailwayUrls('http://localhost:3000');
urls.project({ projectId: 'abc123' });
// http://localhost:3000/project/abc123
```

## Smart Resource Inference

The `resource()` method automatically determines the correct URL based on which IDs you provide:

```ts
// Project overview
railwayUrls.resource({ projectId: 'abc' });
// https://railway.com/project/abc

// Service deployments
railwayUrls.resource({ projectId: 'abc', serviceId: 'svc-123' });
// https://railway.com/project/abc/service/svc-123

// Volume metrics
railwayUrls.resource({ projectId: 'abc', volumeId: 'vol-456' });
// https://railway.com/project/abc/volume/vol-456/metrics

// Bucket files
railwayUrls.resource({ projectId: 'abc', bucketId: 'bucket-789' });
// https://railway.com/project/abc/bucket/bucket-789
```

Priority order: service > volume > bucket > project

## Available Routes

### Marketing
home, careers, changelog, security, help, about, features, customers, enterprise, dashboard, pricing, login, logout, legal pages

### Templates
templateList, templateDetails, newTemplate, templateLoading

### New Flow
newProject, newGitHub, newDatabase, newImage, newFunction, newTemplates, newWorkspace

### Project
project, projectSettings, projectLogs, projectObservability, projectUsage, projectEnvironments, projectMembers, projectIntegrations, projectTokens, projectWebhooks, projectDanger, projectSharedVariables

### Service
projectServiceSourceCode, projectServiceDeployments, projectServiceDomains, projectServiceVariables, projectServiceData, projectServiceBackups, projectServiceMetrics, projectServiceSettings, projectServiceSchedule

### Volume
projectVolumeMetrics, projectVolumeSettings, projectVolumeBackups

### Bucket
projectBucketFiles, projectBucketSettings, projectBucketCredentials

### Account
account, accountNotifications, accountSecurity, accountTokens

### Workspace
workspace, workspaceBilling, workspaceUsage, workspacePeople, workspaceUpgrade, workspacePlan, workspaceEarnings, workspaceReferrals, workspaceTemplates

### Workspace Template Editor
workspaceTemplateEditor, workspaceTemplateEditorSettings, workspaceTemplateEditorService, workspaceTemplateEditorBucket

### User
userProfile

## License

MIT
