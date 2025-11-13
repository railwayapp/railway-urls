// Parameter types
type BaseQueryParams = {
	environmentId?: string | null;
	groupId?: string | null;
};

export type ProjectParams = BaseQueryParams & {
	projectId: string;
	webhookId?: string | null;
};

export type ServiceParams = BaseQueryParams & {
	projectId: string;
	serviceId: string;
	deploymentId?: string | null;
	hash?: string;
	open?: boolean;
	start?: string | null;
	end?: string | null;
	context?: string | null;
	returnTo?: string | null;
	addingVariable?: boolean;
	openAutocomplete?: boolean;
};

export type VolumeParams = BaseQueryParams & {
	projectId: string;
	volumeId: string;
};

export type BucketParams = BaseQueryParams & {
	projectId: string;
	bucketId: string;
};

export type NewProjectParams = {
	isOnboarding?: boolean;
	workspaceId?: string | null;
};

export type ProjectLogsParams = ProjectParams & {
	filter?: string | null;
	context?: string | null;
	start?: string | null;
	end?: string | null;
};

export type TemplateLoadingParams = {
	id: string;
	projectId: string;
};

export type WorkspaceParams = {
	workspaceId?: string | null;
};

export type FeaturesPageSection =
	| "build-and-deploy"
	| "network-and-connect"
	| "scale-and-grow"
	| "monitor-and-observe"
	| "improve-and-automate";

export type WorkspaceUpgradeParams = WorkspaceParams & {
	page?: "prepaid" | "usage";
	plan?: "pro";
};

export type WorkspaceTemplateParams = {
	templateId: string;
};

export type WorkspaceTemplateServiceParams = {
	templateId: string;
	serviceId: string;
};

export type WorkspaceTemplateBucketParams = {
	templateId: string;
	bucketId: string;
};

export type ResourceParams = {
	projectId: string;
	environmentId?: string | null;
	groupId?: string | null;
	serviceId?: string | null;
	volumeId?: string | null;
	bucketId?: string | null;
};

// Helper function to build URLs
function buildUrl(
	baseUrl: string,
	path: string,
	query?: Record<string, string | boolean | undefined | null>,
	hash?: string,
): string {
	let url = `${baseUrl}${path}`;

	if (query) {
		const entries = Object.entries(query)
			.filter(([_, value]) => value != null && value !== "")
			.map(([key, value]) => {
				if (key === "groupId" && value === "root") {
					return null;
				}
				return [key, String(value)] as const;
			})
			.filter((entry): entry is [string, string] => entry !== null);

		if (entries.length > 0) {
			const queryString = entries
				.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
				.join("&");
			url += `?${queryString}`;
		}
	}

	if (hash) {
		url += `#${hash}`;
	}

	return url;
}

export class RailwayUrls {
	constructor(private baseUrl: string = "https://railway.com") {}

	// Marketing pages
	home(): string {
		return this.baseUrl + "/";
	}

	careers({ slug }: { slug?: string } = {}): string {
		return buildUrl(this.baseUrl, slug ? `/careers/${slug}` : "/careers");
	}

	changelog({ slug }: { slug?: string } = {}): string {
		return buildUrl(this.baseUrl, slug ? `/changelog/${slug}` : "/changelog");
	}

	security(): string {
		return this.baseUrl + "/security";
	}

	help(): string {
		return this.baseUrl + "/help";
	}

	about(): string {
		return this.baseUrl + "/about";
	}

	features({ section }: { section?: FeaturesPageSection } = {}): string {
		return buildUrl(this.baseUrl, "/features", undefined, section);
	}

	customers(): string {
		return this.baseUrl + "/customers";
	}

	enterprise(): string {
		return this.baseUrl + "/enterprise";
	}

	dashboard(): string {
		return this.baseUrl + "/dashboard";
	}

	pricing(): string {
		return this.baseUrl + "/pricing";
	}

	launchWeek(): string {
		return this.baseUrl + "/launch-week";
	}

	login(): string {
		return this.baseUrl + "/login";
	}

	logout(): string {
		return this.baseUrl + "/logout";
	}

	legal(): string {
		return this.baseUrl + "/legal";
	}

	privacyPolicy(): string {
		return this.baseUrl + "/legal/privacy";
	}

	fairUse({ hash }: { hash?: string } = {}): string {
		return buildUrl(this.baseUrl, "/legal/fair-use", undefined, hash);
	}

	termsOfService(): string {
		return this.baseUrl + "/legal/terms";
	}

	dpa(): string {
		return this.baseUrl + "/legal/dpa";
	}

	subprocessors(): string {
		return this.baseUrl + "/legal/subprocessors";
	}

	bugBountyProgram(): string {
		return this.baseUrl + "/bug-bounty";
	}

	verify(): string {
		return this.baseUrl + "/verify";
	}

	kickback(): string {
		return this.baseUrl + "/open-source-kickback";
	}

	affiliate(): string {
		return this.baseUrl + "/affiliate-program";
	}

	partners(): string {
		return this.baseUrl + "/partners";
	}

	migrateFromHeroku(): string {
		return this.baseUrl + "/heroku";
	}

	// Templates
	templateList({ category }: { category?: string } = {}): string {
		return buildUrl(this.baseUrl, "/deploy", category ? { category } : undefined);
	}

	templateDetails({ code }: { code: string }): string {
		return buildUrl(this.baseUrl, `/deploy/${code}`);
	}

	// New flow
	newProject({ isOnboarding, workspaceId }: NewProjectParams = {}): string {
		return buildUrl(this.baseUrl, "/new", {
			...(isOnboarding ? { onboarding: "true" } : {}),
			...(workspaceId ? { workspaceId } : {}),
		});
	}

	newGitHub({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/github",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newDatabase({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/database",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newTemplateRoot({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/template",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newImage({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/image",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newFunction({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/function",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newTemplates({ workspaceId }: { workspaceId?: string | null } = {}): string {
		return buildUrl(
			this.baseUrl,
			"/new/templates",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	newWorkspace(): string {
		return this.baseUrl + "/new/workspace";
	}

	newTemplate({
		code,
		workspaceId,
		projectId,
	}: {
		code: string;
		workspaceId?: string | null;
		projectId?: string | null;
	}): string {
		return buildUrl(this.baseUrl, `/new/template/${code}`, {
			...(workspaceId ? { workspaceId } : {}),
			...(projectId ? { projectId } : {}),
		});
	}

	templateLoading({ id, projectId }: TemplateLoadingParams): string {
		return buildUrl(this.baseUrl, `/new/template/project/${projectId}`, { id });
	}

	// Project routes
	project({
		projectId,
		environmentId,
		groupId,
	}: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}`, {
			environmentId,
			groupId,
		});
	}

	projectSettings({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings`, {
			environmentId,
		});
	}

	projectLogs({
		projectId,
		environmentId,
		filter,
		context,
		start,
		end,
	}: ProjectLogsParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/logs`, {
			environmentId,
			filter,
			context,
			start,
			end,
		});
	}

	projectObservability({
		projectId,
		environmentId,
	}: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/observability`, {
			environmentId,
		});
	}

	projectUsage({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/usage`, {
			environmentId,
		});
	}

	projectEnvironments({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/settings/environments`,
			{ environmentId },
		);
	}

	projectMembers({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/members`, {
			environmentId,
		});
	}

	projectIntegrations({
		projectId,
		environmentId,
	}: ProjectParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/settings/integrations`,
			{ environmentId },
		);
	}

	projectTokens({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/tokens`, {
			environmentId,
		});
	}

	projectWebhooks({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/webhooks`, {
			environmentId,
		});
	}

	projectWebhooksNew({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/settings/webhooks/new`,
			{ environmentId },
		);
	}

	projectWebhooksEdit({
		projectId,
		environmentId,
		webhookId,
	}: ProjectParams): string {
		if (!webhookId) {
			throw new Error("webhookId is required for projectWebhooksEdit");
		}
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/settings/webhooks/${webhookId}/edit`,
			{ environmentId },
		);
	}

	projectDanger({ projectId, environmentId }: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/danger`, {
			environmentId,
		});
	}

	projectSharedVariables({
		projectId,
		environmentId,
	}: ProjectParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/settings/variables`, {
			environmentId,
		});
	}

	// Service routes
	projectServiceSourceCode({
		projectId,
		environmentId,
		serviceId,
		groupId,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/source-code`,
			{ environmentId, groupId },
		);
	}

	projectServiceDeployments({
		projectId,
		environmentId,
		serviceId,
		deploymentId,
		open,
		hash,
		start,
		end,
		context,
		groupId,
		returnTo,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}`,
			{
				environmentId,
				...(deploymentId ? { id: deploymentId } : {}),
				...(open ? { open: "true" } : {}),
				...(start ? { start } : {}),
				...(end ? { end } : {}),
				...(context ? { context } : {}),
				...(groupId ? { groupId } : {}),
				...(returnTo ? { returnTo } : {}),
			},
			hash,
		);
	}

	projectServiceDomains({
		projectId,
		environmentId,
		serviceId,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/domains`,
			{ environmentId },
		);
	}

	projectServiceVariables({
		projectId,
		environmentId,
		serviceId,
		addingVariable,
		openAutocomplete,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/variables`,
			{
				environmentId,
				...(addingVariable ? { addingVariable: "true" } : {}),
				...(openAutocomplete ? { openAutocomplete: "true" } : {}),
			},
		);
	}

	projectServiceData({
		projectId,
		environmentId,
		serviceId,
	}: ServiceParams & { query?: Record<string, string> }): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/database`,
			{ environmentId },
		);
	}

	projectServiceBackups({
		projectId,
		environmentId,
		serviceId,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/backups`,
			{ environmentId },
		);
	}

	projectServiceMetrics({
		projectId,
		environmentId,
		serviceId,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/metrics`,
			{ environmentId },
		);
	}

	projectServiceSettings({
		projectId,
		environmentId,
		serviceId,
		hash,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/settings`,
			{ environmentId },
			hash,
		);
	}

	projectServiceSchedule({
		projectId,
		environmentId,
		serviceId,
		deploymentId,
		open,
		hash,
	}: ServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/service/${serviceId}/schedule`,
			{
				environmentId,
				...(deploymentId ? { id: deploymentId } : {}),
				...(open ? { open: "true" } : {}),
			},
			hash,
		);
	}

	// Volume routes
	projectVolumeMetrics({
		projectId,
		environmentId,
		volumeId,
	}: VolumeParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/volume/${volumeId}/metrics`,
			{ environmentId },
		);
	}

	projectVolumeSettings({
		projectId,
		environmentId,
		volumeId,
	}: VolumeParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/volume/${volumeId}/settings`,
			{ environmentId },
		);
	}

	projectVolumeBackups({
		projectId,
		environmentId,
		volumeId,
	}: VolumeParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/volume/${volumeId}/backups`,
			{ environmentId },
		);
	}

	// Bucket routes
	projectBucketFiles({
		projectId,
		environmentId,
		bucketId,
	}: BucketParams): string {
		return buildUrl(this.baseUrl, `/project/${projectId}/bucket/${bucketId}`, {
			environmentId,
		});
	}

	projectBucketSettings({
		projectId,
		environmentId,
		bucketId,
	}: BucketParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/bucket/${bucketId}/settings`,
			{ environmentId },
		);
	}

	projectBucketCredentials({
		projectId,
		environmentId,
		bucketId,
	}: BucketParams): string {
		return buildUrl(
			this.baseUrl,
			`/project/${projectId}/bucket/${bucketId}/credentials`,
			{ environmentId },
		);
	}

	// Account routes
	account(): string {
		return this.baseUrl + "/account";
	}

	accountNotifications(): string {
		return this.baseUrl + "/account/notifications";
	}

	accountSecurity(): string {
		return this.baseUrl + "/account/security";
	}

	accountTokens(): string {
		return this.baseUrl + "/account/tokens";
	}

	// Workspace routes
	workspace({ workspaceId }: WorkspaceParams = {}): string {
		return buildUrl(
			this.baseUrl,
			"/workspace",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspaceBilling({ workspaceId }: WorkspaceParams = {}): string {
		return buildUrl(
			this.baseUrl,
			"/workspace/billing",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspaceUsage({ workspaceId }: WorkspaceParams = {}): string {
		return buildUrl(
			this.baseUrl,
			"/workspace/usage",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspacePeople({ workspaceId }: WorkspaceParams = {}): string {
		return buildUrl(
			this.baseUrl,
			"/workspace/people",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspaceUpgrade({
		page,
		workspaceId,
		plan,
	}: WorkspaceUpgradeParams = {}): string {
		return buildUrl(
			this.baseUrl,
			page ? `/workspace/upgrade#${page}` : "/workspace/upgrade",
			{
				...(workspaceId ? { workspaceId } : {}),
				...(plan ? { plan } : {}),
			},
		);
	}

	workspacePlan({
		workspaceId,
		hash,
	}: WorkspaceParams & { hash?: string } = {}): string {
		return buildUrl(
			this.baseUrl,
			hash ? `/workspace/plans#${hash}` : "/workspace/plans",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspaceEarnings({ workspaceId }: WorkspaceParams = {}): string {
		return buildUrl(
			this.baseUrl,
			"/workspace/earnings",
			workspaceId ? { workspaceId } : undefined,
		);
	}

	workspaceReferrals(): string {
		return this.baseUrl + "/workspace/referrals";
	}

	workspaceTemplates({
		code,
		workspaceId,
	}: { code?: string; workspaceId?: string } = {}): string {
		return buildUrl(this.baseUrl, "/workspace/templates", {
			...(code ? { code } : {}),
			...(workspaceId ? { workspaceId } : {}),
		});
	}

	// Workspace template editor routes
	workspaceTemplateEditor({ templateId }: WorkspaceTemplateParams): string {
		return buildUrl(this.baseUrl, `/workspace/templates/${templateId}`);
	}

	workspaceTemplateEditorSettings({
		templateId,
	}: WorkspaceTemplateParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/settings`,
		);
	}

	workspaceTemplateEditorSettingsDanger({
		templateId,
	}: WorkspaceTemplateParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/settings/danger`,
		);
	}

	workspaceTemplateEditorService({
		templateId,
		serviceId,
	}: WorkspaceTemplateServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/service/${serviceId}`,
		);
	}

	workspaceTemplateEditorServiceSettings({
		templateId,
		serviceId,
	}: WorkspaceTemplateServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/service/${serviceId}/settings`,
		);
	}

	workspaceTemplateEditorServiceSourceCode({
		templateId,
		serviceId,
	}: WorkspaceTemplateServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/service/${serviceId}/source-code`,
		);
	}

	workspaceTemplateEditorServiceVariables({
		templateId,
		serviceId,
	}: WorkspaceTemplateServiceParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/service/${serviceId}/variables`,
		);
	}

	workspaceTemplateEditorBucket({
		templateId,
		bucketId,
	}: WorkspaceTemplateBucketParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/bucket/${bucketId}`,
		);
	}

	workspaceTemplateEditorBucketCredentials({
		templateId,
		bucketId,
	}: WorkspaceTemplateBucketParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/bucket/${bucketId}/credentials`,
		);
	}

	workspaceTemplateEditorBucketSettings({
		templateId,
		bucketId,
	}: WorkspaceTemplateBucketParams): string {
		return buildUrl(
			this.baseUrl,
			`/workspace/templates/${templateId}/bucket/${bucketId}/settings`,
		);
	}

	// User profile
	userProfile({ username }: { username: string }): string {
		return buildUrl(this.baseUrl, `/u/${username}`);
	}

	// Smart resource inference
	resource(params: ResourceParams): string {
		if (params.serviceId) {
			return this.projectServiceDeployments({
				projectId: params.projectId,
				serviceId: params.serviceId,
				environmentId: params.environmentId,
				groupId: params.groupId,
			});
		}
		if (params.volumeId) {
			return this.projectVolumeMetrics({
				projectId: params.projectId,
				volumeId: params.volumeId,
				environmentId: params.environmentId,
			});
		}
		if (params.bucketId) {
			return this.projectBucketFiles({
				projectId: params.projectId,
				bucketId: params.bucketId,
				environmentId: params.environmentId,
			});
		}
		return this.project(params);
	}
}

export const railwayUrls: RailwayUrls = new RailwayUrls();
