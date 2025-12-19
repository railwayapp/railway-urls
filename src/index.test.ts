import { describe, expect, test } from "bun:test";
import { RailwayUrls, railwayUrls } from "./index";

describe("RailwayUrls", () => {
  describe("default instance", () => {
    test("uses default baseUrl", () => {
      expect(railwayUrls.home()).toBe("https://railway.com/");
    });
  });

  describe("custom baseUrl", () => {
    test("uses custom baseUrl", () => {
      const custom = new RailwayUrls("http://localhost:3000");
      expect(custom.home()).toBe("http://localhost:3000/");
    });
  });

  describe("marketing pages", () => {
    test("home", () => {
      expect(railwayUrls.home()).toBe("https://railway.com/");
    });

    test("careers without slug", () => {
      expect(railwayUrls.careers()).toBe("https://railway.com/careers");
    });

    test("careers with slug", () => {
      expect(railwayUrls.careers({ slug: "engineer" })).toBe(
        "https://railway.com/careers/engineer"
      );
    });

    test("changelog without slug", () => {
      expect(railwayUrls.changelog()).toBe("https://railway.com/changelog");
    });

    test("changelog with slug", () => {
      expect(railwayUrls.changelog({ slug: "2024-01" })).toBe(
        "https://railway.com/changelog/2024-01"
      );
    });

    test("features without section", () => {
      expect(railwayUrls.features()).toBe("https://railway.com/features");
    });

    test("features with section", () => {
      expect(railwayUrls.features({ section: "build-and-deploy" })).toBe(
        "https://railway.com/features#build-and-deploy"
      );
    });

    test("pricing", () => {
      expect(railwayUrls.pricing()).toBe("https://railway.com/pricing");
    });

    test("legal pages", () => {
      expect(railwayUrls.legal()).toBe("https://railway.com/legal");
      expect(railwayUrls.privacyPolicy()).toBe(
        "https://railway.com/legal/privacy"
      );
      expect(railwayUrls.termsOfService()).toBe(
        "https://railway.com/legal/terms"
      );
      expect(railwayUrls.fairUse()).toBe("https://railway.com/legal/fair-use");
      expect(railwayUrls.fairUse({ hash: "examples" })).toBe(
        "https://railway.com/legal/fair-use#examples"
      );
    });
  });

  describe("templates", () => {
    test("templateList without category", () => {
      expect(railwayUrls.templateList()).toBe("https://railway.com/deploy");
    });

    test("templateList with category", () => {
      expect(railwayUrls.templateList({ category: "databases" })).toBe(
        "https://railway.com/deploy?category=databases"
      );
    });

    test("templateDetails", () => {
      expect(railwayUrls.templateDetails({ code: "postgres" })).toBe(
        "https://railway.com/deploy/postgres"
      );
    });
  });

  describe("new flow", () => {
    test("newProject without params", () => {
      expect(railwayUrls.newProject()).toBe("https://railway.com/new");
    });

    test("newProject with onboarding", () => {
      expect(railwayUrls.newProject({ isOnboarding: true })).toBe(
        "https://railway.com/new?onboarding=true"
      );
    });

    test("newProject with workspaceId", () => {
      expect(railwayUrls.newProject({ workspaceId: "workspace-123" })).toBe(
        "https://railway.com/new?workspaceId=workspace-123"
      );
    });

    test("newGitHub", () => {
      expect(railwayUrls.newGitHub()).toBe("https://railway.com/new/github");
      expect(railwayUrls.newGitHub({ workspaceId: "workspace-123" })).toBe(
        "https://railway.com/new/github?workspaceId=workspace-123"
      );
    });

    test("newDatabase", () => {
      expect(railwayUrls.newDatabase()).toBe(
        "https://railway.com/new/database"
      );
    });

    test("newTemplate", () => {
      expect(railwayUrls.newTemplate({ code: "nextjs" })).toBe(
        "https://railway.com/new/template/nextjs"
      );
      expect(
        railwayUrls.newTemplate({
          code: "nextjs",
          workspaceId: "workspace-123",
        })
      ).toBe(
        "https://railway.com/new/template/nextjs?workspaceId=workspace-123"
      );
    });

    test("templateLoading", () => {
      expect(
        railwayUrls.templateLoading({
          id: "template-123",
          projectId: "project-456",
        })
      ).toBe(
        "https://railway.com/new/template/project/project-456?id=template-123"
      );
    });
  });

  describe("project routes", () => {
    test("project with required params", () => {
      expect(railwayUrls.project({ projectId: "proj-123" })).toBe(
        "https://railway.com/project/proj-123"
      );
    });

    test("project with environmentId", () => {
      expect(
        railwayUrls.project({
          projectId: "proj-123",
          environmentId: "env-prod",
        })
      ).toBe("https://railway.com/project/proj-123?environmentId=env-prod");
    });

    test("project with groupId", () => {
      expect(
        railwayUrls.project({
          projectId: "proj-123",
          groupId: "group-abc",
        })
      ).toBe("https://railway.com/project/proj-123?groupId=group-abc");
    });

    test('project with groupId="root" excludes it', () => {
      expect(
        railwayUrls.project({
          projectId: "proj-123",
          groupId: "root",
        })
      ).toBe("https://railway.com/project/proj-123");
    });

    test("project with all params", () => {
      expect(
        railwayUrls.project({
          projectId: "proj-123",
          environmentId: "env-prod",
          groupId: "group-abc",
        })
      ).toBe(
        "https://railway.com/project/proj-123?environmentId=env-prod&groupId=group-abc"
      );
    });

    test("projectSettings", () => {
      expect(
        railwayUrls.projectSettings({
          projectId: "proj-123",
          environmentId: "env-prod",
        })
      ).toBe(
        "https://railway.com/project/proj-123/settings?environmentId=env-prod"
      );
    });

    test("projectLogs with filters", () => {
      expect(
        railwayUrls.projectLogs({
          projectId: "proj-123",
          environmentId: "env-prod",
          filter: "error",
          start: "2024-01-01",
          end: "2024-01-31",
        })
      ).toBe(
        "https://railway.com/project/proj-123/logs?environmentId=env-prod&filter=error&start=2024-01-01&end=2024-01-31"
      );
    });

    test("projectWebhooksEdit", () => {
      expect(
        railwayUrls.projectWebhooksEdit({
          projectId: "proj-123",
          webhookId: "webhook-456",
        })
      ).toBe(
        "https://railway.com/project/proj-123/settings/webhooks/webhook-456/edit"
      );
    });

    test("projectWebhooksEdit throws without webhookId", () => {
      expect(() =>
        railwayUrls.projectWebhooksEdit({ projectId: "proj-123" })
      ).toThrow("webhookId is required");
    });
  });

  describe("service routes", () => {
    test("projectServiceDeployments basic", () => {
      expect(
        railwayUrls.projectServiceDeployments({
          projectId: "proj-123",
          serviceId: "svc-456",
        })
      ).toBe("https://railway.com/project/proj-123/service/svc-456");
    });

    test("projectServiceDeployments with all params", () => {
      expect(
        railwayUrls.projectServiceDeployments({
          projectId: "proj-123",
          serviceId: "svc-456",
          environmentId: "env-prod",
          deploymentId: "deploy-789",
          open: true,
          hash: "logs",
        })
      ).toBe(
        "https://railway.com/project/proj-123/service/svc-456?environmentId=env-prod&id=deploy-789&open=true#logs"
      );
    });

    test("projectServiceVariables", () => {
      expect(
        railwayUrls.projectServiceVariables({
          projectId: "proj-123",
          serviceId: "svc-456",
          addingVariable: true,
        })
      ).toBe(
        "https://railway.com/project/proj-123/service/svc-456/variables?addingVariable=true"
      );
    });

    test("projectServiceSettings with hash", () => {
      expect(
        railwayUrls.projectServiceSettings({
          projectId: "proj-123",
          serviceId: "svc-456",
          hash: "networking",
        })
      ).toBe(
        "https://railway.com/project/proj-123/service/svc-456/settings#networking"
      );
    });
  });

  describe("volume routes", () => {
    test("projectVolumeMetrics", () => {
      expect(
        railwayUrls.projectVolumeMetrics({
          projectId: "proj-123",
          volumeId: "vol-456",
          environmentId: "env-prod",
        })
      ).toBe(
        "https://railway.com/project/proj-123/volume/vol-456/metrics?environmentId=env-prod"
      );
    });
  });

  describe("bucket routes", () => {
    test("projectBucketFiles", () => {
      expect(
        railwayUrls.projectBucketFiles({
          projectId: "proj-123",
          bucketId: "bucket-456",
        })
      ).toBe("https://railway.com/project/proj-123/bucket/bucket-456");
    });

    test("projectBucketCredentials", () => {
      expect(
        railwayUrls.projectBucketCredentials({
          projectId: "proj-123",
          bucketId: "bucket-456",
          environmentId: "env-prod",
        })
      ).toBe(
        "https://railway.com/project/proj-123/bucket/bucket-456/credentials?environmentId=env-prod"
      );
    });
  });

  describe("account routes", () => {
    test("account pages", () => {
      expect(railwayUrls.account()).toBe("https://railway.com/account");
      expect(railwayUrls.accountNotifications()).toBe(
        "https://railway.com/account/notifications"
      );
      expect(railwayUrls.accountSecurity()).toBe(
        "https://railway.com/account/security"
      );
      expect(railwayUrls.accountTokens()).toBe(
        "https://railway.com/account/tokens"
      );
    });
  });

  describe("workspace routes", () => {
    test("workspace without workspaceId", () => {
      expect(railwayUrls.workspace()).toBe("https://railway.com/workspace");
    });

    test("workspace with workspaceId", () => {
      expect(railwayUrls.workspace({ workspaceId: "workspace-123" })).toBe(
        "https://railway.com/workspace?workspaceId=workspace-123"
      );
    });

    test("workspaceBilling", () => {
      expect(
        railwayUrls.workspaceBilling({ workspaceId: "workspace-123" })
      ).toBe("https://railway.com/workspace/billing?workspaceId=workspace-123");
    });

    test("workspaceUpgrade without params", () => {
      expect(railwayUrls.workspaceUpgrade()).toBe(
        "https://railway.com/workspace/upgrade"
      );
    });

    test("workspaceUpgrade with page", () => {
      expect(railwayUrls.workspaceUpgrade({ page: "prepaid" })).toBe(
        "https://railway.com/workspace/upgrade#prepaid"
      );
    });

    test("workspaceUpgrade with plan", () => {
      expect(railwayUrls.workspaceUpgrade({ plan: "pro" })).toBe(
        "https://railway.com/workspace/upgrade?plan=pro"
      );
    });

    test("workspaceTemplates", () => {
      expect(railwayUrls.workspaceTemplates()).toBe(
        "https://railway.com/workspace/templates"
      );
      expect(
        railwayUrls.workspaceTemplates({
          code: "template-123",
          workspaceId: "workspace-456",
        })
      ).toBe(
        "https://railway.com/workspace/templates?code=template-123&workspaceId=workspace-456"
      );
    });
  });

  describe("workspace template editor routes", () => {
    test("workspaceTemplateEditor", () => {
      expect(
        railwayUrls.workspaceTemplateEditor({ templateId: "template-123" })
      ).toBe("https://railway.com/workspace/templates/template-123");
    });

    test("workspaceTemplateEditorService", () => {
      expect(
        railwayUrls.workspaceTemplateEditorService({
          templateId: "template-123",
          serviceId: "svc-456",
        })
      ).toBe(
        "https://railway.com/workspace/templates/template-123/service/svc-456"
      );
    });

    test("workspaceTemplateEditorBucketCredentials", () => {
      expect(
        railwayUrls.workspaceTemplateEditorBucketCredentials({
          templateId: "template-123",
          bucketId: "bucket-456",
        })
      ).toBe(
        "https://railway.com/workspace/templates/template-123/bucket/bucket-456/credentials"
      );
    });
  });

  describe("user profile", () => {
    test("userProfile", () => {
      expect(railwayUrls.userProfile({ username: "johndoe" })).toBe(
        "https://railway.com/u/johndoe"
      );
    });
  });

  describe("URL encoding", () => {
    test("encodes special characters in query params", () => {
      expect(
        railwayUrls.projectLogs({
          projectId: "proj-123",
          filter: "error & warning",
        })
      ).toBe(
        "https://railway.com/project/proj-123/logs?filter=error%20%26%20warning"
      );
    });

    test("filters null and undefined params", () => {
      expect(
        railwayUrls.project({
          projectId: "proj-123",
          environmentId: null,
          groupId: undefined,
        })
      ).toBe("https://railway.com/project/proj-123");
    });
  });

  describe("resource inference", () => {
    test("infers correct URL based on provided resource IDs", () => {
      // Project only
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
        })
      ).toBe("https://railway.com/project/proj-123");

      // Project with environment
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          environmentId: "env-prod",
        })
      ).toBe("https://railway.com/project/proj-123?environmentId=env-prod");

      // Service
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          serviceId: "svc-456",
        })
      ).toBe("https://railway.com/project/proj-123/service/svc-456");

      // Service with environment and groupId
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          serviceId: "svc-456",
          environmentId: "env-prod",
          groupId: "group-abc",
        })
      ).toBe(
        "https://railway.com/project/proj-123/service/svc-456?environmentId=env-prod&groupId=group-abc"
      );

      // Service with deploymentId
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          serviceId: "svc-456",
          deploymentId: "deploy-789",
        })
      ).toBe(
        "https://railway.com/project/proj-123/service/svc-456?id=deploy-789"
      );

      // Volume
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          volumeId: "vol-456",
          environmentId: "env-prod",
        })
      ).toBe(
        "https://railway.com/project/proj-123/volume/vol-456/metrics?environmentId=env-prod"
      );

      // Bucket
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          bucketId: "bucket-456",
        })
      ).toBe("https://railway.com/project/proj-123/bucket/bucket-456");

      // Service priority over volume
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          serviceId: "svc-456",
          volumeId: "vol-789",
        })
      ).toBe("https://railway.com/project/proj-123/service/svc-456");

      // Service priority over bucket
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          serviceId: "svc-456",
          bucketId: "bucket-789",
        })
      ).toBe("https://railway.com/project/proj-123/service/svc-456");

      // Volume priority over bucket
      expect(
        railwayUrls.resource({
          projectId: "proj-123",
          volumeId: "vol-456",
          bucketId: "bucket-789",
        })
      ).toBe(
        "https://railway.com/project/proj-123/volume/vol-456/metrics"
      );
    });
  });
});
