define("events",[],function(){var e=angular.module("App.Events",[]);e.constant("events",{DATASETS_ERROR:"datasets_error",DATESETS_RETRIEVED:"datasets_retrieved",DATASETS_RETRIEVING:"datasets_retrieving",DATASETS_QUERY:"datasets_query",DATASETS_QUERYING:"datasets_querying",GROUPS_ERROR:"groups_error",GROUPS_RETRIEVED:"groups_retrieved",GROUPS_RETRIEVING:"groups_retrieving",GROUPS_QUERY:"groups_query",GROUPS_QUERYING:"groups_querying",ORGANIZATIONS_ERROR:"organizations_error",ORGANIZATIONS_RETRIEVED:"organizations_retrieved",ORGANIZATIONS_RETRIEVING:"organizations_retrieving",ORGANIZATIONS_QUERY:"organizations_query",ORGANIZATIONS_QUERYING:"organizations_querying",SERVICE_TIMEOUT:"service_timeout"})}),define("common/CkanService",[],function(){return function(e,t,n){var r={_error:!1,_querying:"",_timeout:5e3,_total:0,_resource:t("http://catalogo.datos.gob.mx/api/3/action/:action",null,{dataset:{method:"GET",isArray:!1,transformResponse:function(e){var t=angular.fromJson(e);return t.result}},datasets:{method:"GET",isArray:!0,transformResponse:function(e){var t=angular.fromJson(e);return r._total=t.result.count,t.result.results}},group:{method:"GET",isArray:!1,transformResponse:function(e){var t=angular.fromJson(e);return t.result}},groups:{method:"GET",isArray:!0,transformResponse:function(e){var t=angular.fromJson(e);return r._total=t.result.length,t.result}},organization:{method:"GET",isArray:!1,transformResponse:function(e){var t=angular.fromJson(e);return t.result}},organizations:{method:"GET",isArray:!0,transformResponse:function(e){var t=angular.fromJson(e);return r._total=t.result.length,t.result}}}),_setTimeout:function(){var t=this;return this._error=!1,setTimeout(function(){t._error=!0,e.$broadcast(n.SERVICE_TIMEOUT)},this._timeout)},getEvent:function(e){switch(e){case"ERROR":if(this._querying=="datasets")return n.DATASETS_ERROR;if(this._querying=="groups")return n.GROUPS_ERROR;if(this._querying=="organizations")return n.ORGANIZATIONS_ERROR;break;case"QUERY":if(this._querying=="datasets")return n.DATASETS_QUERY;if(this._querying=="groups")return n.GROUPS_QUERY;if(this._querying=="organizations")return n.ORGANIZATIONS_QUERY;break;case"QUERYING":if(this._querying=="datasets")return n.DATASETS_QUERYING;if(this._querying=="groups")return n.GROUPS_QUERYING;if(this._querying=="organizations")return n.ORGANIZATIONS_QUERYING}},getPageSize:function(){return 10},getTotal:function(){return this._total},dataset:function(t){return e.$broadcast(n.DATASETS_RETRIEVING),this._resource.dataset({action:"package_show",id:t},function(t){while(!t.$resolved);e.$broadcast(n.DATASETS_RETRIEVED,t)})},datasets:function(t,r,i){e.$broadcast(n.DATASETS_QUERYING);var s=this._setTimeout();return this._resource.datasets({action:"package_search",q:t,rows:10,start:i,sort:r},function(t){while(!t.$resolved);clearTimeout(s),e.$broadcast(n.DATASETS_QUERY,t)})},group:function(t){return e.$broadcast(n.GROUPS_RETRIEVING),this._resource.group({action:"group_show",all_fields:"true",id:t},function(t){while(!t.$resolved);e.$broadcast(n.GROUPS_RETRIEVED,t)})},groups:function(){e.$broadcast(n.GROUPS_QUERYING);var t=this._setTimeout();return this._resource.groups({action:"group_list",all_fields:"true"},function(r){while(!r.$resolved);clearTimeout(t),e.$broadcast(n.GROUPS_QUERY,r)})},organization:function(t){return e.$broadcast(n.ORGANIZATIONS_RETRIEVING),this._resource.organization({action:"organization_show",all_fields:!0,id:t},function(t){while(!t.$resolved);e.$broadcast(n.ORGANIZATIONS_RETRIEVED,t)})},organizations:function(){e.$broadcast(n.ORGANIZATIONS_QUERYING);var t=this._setTimeout();return this._resource.organizations({action:"organization_list",all_fields:!0},function(r){while(!r.$resolved);clearTimeout(t),e.$broadcast(n.ORGANIZATIONS_QUERY,r)})},setModel:function(e){this._querying=e}};return r}}),define("common/FiltersCtrl",[],function(){return function(e,t){t.categoryFilter=function(t,n){t.preventDefault(),e.$broadcast("CATEGORY_FILTER",n)},t.govFilter=function(t,n){t.preventDefault(),e.$broadcast("GOVERNMENT_FILTER",n)},t.formatFilter=function(t,n){t.preventDefault(),e.$broadcast("FORMAT_FILTER",n)}}}),define("common/NoSpaceFilter",[],function(){return function(){return function(e){return e?e.replace(/ /g,""):""}}}),define("common/SubstringFilter",[],function(){return function(){return function(e,t,n){return e.substring(t,n)}}}),define("common/SpinnerDirective",[],function(){return function(){return{restrict:"EA",templateUrl:"partials/spinner.html",link:function(){}}}}),define("common/CommonModule",["require","common/CkanService","common/FiltersCtrl","common/NoSpaceFilter","common/SubstringFilter","common/SpinnerDirective"],function(e){var t=e("common/CkanService"),n=e("common/FiltersCtrl"),r=e("common/NoSpaceFilter"),i=e("common/SubstringFilter"),s=e("common/SpinnerDirective"),o=angular.module("CommonModule",[]);o.controller("FiltersCtrl",["$rootScope","$scope",n]),o.directive("loader",[s]),o.factory("CkanService",["$rootScope","$resource","events",t]),o.filter("noSpace",[r]),o.filter("substring",[i])}),define("datasets/DatasetsDetailsCtrl",[],function(){return function(e,t,n,r){e.dataset=r.dataset(t.id),e.searching=!0,e.clear=function(){e.filter=""},e.less=function(e){$(e.currentTarget).parent().fadeOut().prev().fadeIn()},e.more=function(e){$(e.currentTarget).fadeOut().next().fadeIn()},e.$on(n.DATASETS_RETRIEVED,function(){e.searching=!1;for(var t=0;t<e.dataset.extras.length;t++)if(e.dataset.extras[t].key=="dcat_publisher_email")e.publisher_email=e.dataset.extras[t].value;else if(e.dataset.extras[t].key=="dcat_publisher_name")e.publisher_name=e.dataset.extras[t].value;else if(e.dataset.extras[t].key=="dcat_modified"){var n=new Date(e.dataset.extras[t].value);e.dcatModified=new Date(n.getTime()-n.getTimezoneOffset()*6e4)}$(".organization-image img").load(function(){$(this).css({"margin-top":($(".organization-image").height()-$(this).height())/2})});var r=new Date(e.dataset.metadata_created),i=new Date(e.dataset.metadata_modified);e.dataset.metadata_created=new Date(r.getTime()-r.getTimezoneOffset()*6e4),e.dataset.metadata_modified=new Date(i.getTime()-i.getTimezoneOffset()*6e4),$(".breadcrumb li:last-child span").html(e.dataset.title);var s="datosgobmx";window.disqus_config=function(){this.language="es_MX",this.page.url=location,this.page.identifier=e.dataset.name,this.page.title=e.dataset.title},function(){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="//"+s+".disqus.com/embed.js",(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(e)}()})}}),define("datasets/DatasetsRouter",[],function(){return function(e){e.state("datasets",{"abstract":!0,views:{"search-container":{templateUrl:"partials/datasets/search.html",controller:"DatasetsSearchCtrl"}},data:{breadcrumbProxy:"datasets.results"}}).state("datasets.results",{url:"/conjuntos/?page",views:{"datasets-sidebar":{templateUrl:"partials/datasets/filters.html",controller:"FiltersCtrl"},"datasets-content":{templateUrl:"partials/datasets/results.html",controller:"DatasetsResultsCtrl"}},reloadOnSearch:!1,data:{displayName:"Todos los datos"}}).state("datasets.details",{url:"/conjuntos/:id/?page",views:{"search-container@":{templateUrl:"partials/datasets/details.html",controller:"DatasetsDetailsCtrl"}},data:{displayName:"Conjunto de datos"}})}}),define("datasets/DatasetsSearchCtrl",[],function(){return function(e,t,n){n.setModel("datasets");var r="",i="",s="",o="",u=t.search(),a=0,f=function(){s="";if(e.keyword){var t=e.keyword,n=t.split(" ").join("* OR ");t=t.split(" ").join(" OR "),s+="(title:("+t.toLowerCase()+" OR "+n.toLowerCase()+"*"+" OR "+t.charAt(0).toUpperCase()+t.slice(1)+" OR "+n.charAt(0).toUpperCase()+n.slice(1)+"*) OR notes:("+e.keyword.toLowerCase()+"))"}o&&($(".gov-filter").removeClass("active"),$("#item-"+o).addClass("active"),s+="+tags:("+o+")");if(r){var u=r.indexOf(" ")!=-1?r.substring(0,r.indexOf(" ")):r;$(".category-filter").removeClass("active"),$("#item-"+u).addClass("active"),s!=""&&(s+=" AND "),s+="tags:"+r.replace(/ /g,"-")}i&&(s+="+res_format:"+i)},l=function(){f(),n.datasets(s,e.query.order,a)};e.query={},u.q&&(e.keyword=decodeURIComponent(u.q)),u.categoria&&(r=u.categoria,e.$emit("CATEGORY_FILTER",r)),u.formato&&(i=u.formato,e.$emit("FORMAT_FILTER",i)),u.gob&&(o=u.gob,e.$emit("GOVERNMENT_FILTER",o)),u.page&&(a=(u.page-1)*10),e.query.order=u.orden?decodeURIComponent(u.orden):"dcat_modified desc, score desc",e.clearSearch=function(){e.keyword="",t.search("q",null),l()},e.search=function(){e.keyword?t.search("q",encodeURIComponent(e.keyword)):t.search("q",null),l()},e.sort=function(){e.query.order!="score desc, metadata_modified desc"?t.search("orden",encodeURIComponent(e.query.order)):t.search("orden",null),l()},e.$on(n.getEvent("QUERY"),function(){e.count=n.getTotal()}),e.$on("PAGE_UPDATED",function(e,n){e.preventDefault(),n>1?t.search("page",n):t.search("page",null),a=(n-1)*10,l()}),e.$on("GOVERNMENT_FILTER",function(e,n){o=n,t.search("gob",n),l()}),e.$on("CATEGORY_FILTER",function(e,n){n=="all"?(r="",t.search("categoria",null)):(r=n,t.search("categoria",n)),l()}),e.$on("FORMAT_FILTER",function(e,n){i=n,t.search("formato",n),l()}),e.$on("GOVERNMENT_CLEAR",function(){$(".gov-filter").removeClass("active"),t.search("gob",null),o="",l()}),e.$on("CATEGORY_CLEAR",function(){$(".category-filter").removeClass("active"),$("#item-all").addClass("active"),t.search("categoria",null),r="",l()}),e.$on("FORMAT_CLEAR",function(){$(".format-filter").removeClass("active"),t.search("formato",null),i="",l()}),l()}}),define("common/ResultsCtrl",[],function(){return function(e,t,n,r,i,s){var o=!1,u=i.search(),a=function(t,n){switch(n){case"federal":e.government="Federal";break;case"state":e.government="Estatal";break;case"municipal":e.government="Municipal";break;case"autonomous":e.government="Organismos Autónomos"}};e.empty=!0,e.searching=!0,e.category="",e.government="",e.clearCat=function(){e.category="",e.$emit("CATEGORY_CLEAR")},e.clearFormat=function(){e.format="",e.$emit("FORMAT_CLEAR")},e.clearGov=function(){e.government="",e.$emit("GOVERNMENT_CLEAR")},e.paginate=function(){o=!0,e.$emit("PAGE_UPDATED",e.page)},e.reload=function(){location.reload()},e.selectDataset=function(e){t.go("datasets.details",{id:e})},e.selectGroup=function(e){t.go("groups.details",{id:e})},e.selectOrganization=function(e){t.go("organizations.details",{id:e})},u.categoria&&(e.category=u.categoria),u.formato&&(e.format=u.formato),u.gob&&a(null,u.gob),e.$on(r.getEvent("QUERYING"),function(){e.searching=!0,e.service_error=null}),e.$on(r.getEvent("QUERY"),function(t,i){t.preventDefault(),e.searching=!1,e.results=i,e.limit=r.getPageSize(),e.total=r.getTotal(),n.page&&!o&&(e.page=n.page),e.results.length==0?e.empty=!0:e.empty=!1;if(r._querying=="datasets")for(var s=0;s<e.results.length;s++)for(var u=0;u<e.results[s].tags.length;u++)switch(e.results[s].tags[u].name){case"salud":e.results[s].section="health";break;case"geoespacial":e.results[s].section="geospatial";break;case"seguridad-y-justicia":e.results[s].section="security";break;case"energia-y-medio-ambiente":e.results[s].section="energy";break;case"educacion":e.results[s].section="education";break;case"economia":e.results[s].section="economy";break;case"cultura-y-turismo":e.results[s].section="culture";break;case"finanzas-y-contrataciones":e.results[s].section="finance";break;case"infraestructura":e.results[s].section="infrastructure";break;case"desarrollo-sostenible":e.results[s].section="development";break;case"gobiernos-locales":e.results[s].section="government"}}),e.$on("GOVERNMENT_FILTER",a),e.$on("CATEGORY_FILTER",function(t,n){n=="all"?e.category="":e.category=n.charAt(0).toUpperCase()+n.slice(1)}),e.$on("FORMAT_FILTER",function(t,n){n=="all"?e.format="":e.format=n.toUpperCase()}),e.$on("ORGANIZATIONS_FILTER",function(t,n){e.filter=n}),e.$on("GROUPS_FILTER",function(t,n){e.filter=n}),e.$on(s.SERVICE_TIMEOUT,function(){e.$apply(function(){e.searching=!1,e.service_error="Estamos en proceso de migración y actualización de infraestructura para ofrecer un mejor servicio. Si aún no encuentra lo que buscaba, por favor actualice la página o espere algunos minutos. Gracias."})})}}),define("datasets/DatasetsModule",["require","datasets/DatasetsDetailsCtrl","datasets/DatasetsRouter","datasets/DatasetsSearchCtrl","common/ResultsCtrl"],function(e){var t=e("datasets/DatasetsDetailsCtrl"),n=e("datasets/DatasetsRouter"),r=e("datasets/DatasetsSearchCtrl"),i=e("common/ResultsCtrl"),s=angular.module("DatasetsModule",[]);s.config(["$stateProvider",n]),s.controller("DatasetsDetailsCtrl",["$scope","$stateParams","events","CkanService",t]),s.controller("DatasetsResultsCtrl",["$scope","$state","$stateParams","CkanService","$location","events",i]),s.controller("DatasetsSearchCtrl",["$scope","$location","CkanService",r])}),define("groups/GroupsDetailsCtrl",[],function(){return function(e,t,n,r,i){e.group=i.group(n.id),e.searching=!0,e.clear=function(){e.filter=""},e.selectDataset=function(e){t.go("datasets.details",{id:e})},e.$on(r.GROUPS_RETRIEVED,function(){e.searching=!1,$(".organization-image img").load(function(){$(this).css({"margin-top":($(".organization-image").height()-$(this).height())/2})});for(var t=0;t<e.group.packages.length;t++)if(e.group.packages[t].tags!=undefined)for(var n=0;n<e.group.packages[t].tags.length;n++)switch(e.group.packages[t].tags[n].name){case"salud":e.group.packages[t].section="health";break;case"geoespacial":e.group.packages[t].section="geospatial";break;case"seguridad-y-justicia":e.group.packages[t].section="security";break;case"energia-y-medio-ambiente":e.group.packages[t].section="energy";break;case"educacion":e.group.packages[t].section="education";break;case"economia":e.group.packages[t].section="economy";break;case"cultura-y-turismo":e.group.packages[t].section="culture";break;case"finanzas-y-contrataciones":e.group.packages[t].section="finance";break;case"infraestructura":e.group.packages[t].section="infrastructure";break;case"desarrollo-sostenible":e.group.packages[t].section="development";break;case"gobiernos-locales":e.group.packages[t].section="government"}$(".breadcrumb li:last-child span").html(e.group.title)})}}),define("groups/GroupsRouter",[],function(){return function(e){e.state("groups",{"abstract":!0,views:{"search-container":{templateUrl:"partials/datasets/search.html",controller:"GroupsSearchCtrl"}},data:{breadcrumbProxy:"groups.results"}}).state("groups.results",{url:"/grupos/?page",views:{"datasets-sidebar":{templateUrl:"partials/datasets/filters.html"},"datasets-content":{templateUrl:"partials/groups/results.html",controller:"GroupsResultsCtrl"}},reloadOnSearch:!1,data:{displayName:"Grupos"}}).state("groups.details",{url:"/grupos/:id/?page",views:{"search-container@":{templateUrl:"partials/groups/details.html",controller:"GroupsDetailsCtrl"}},data:{displayName:"Grupo"}})}}),define("groups/GroupsSearchCtrl",[],function(){return function(e,t,n){n.setModel("groups");var r=function(){n.groups()};t.clearSearch=function(){t.keyword=""},t.$on(n.getEvent("QUERY"),function(){t.count=n.getTotal()}),t.$watch("keyword",function(t){e.$broadcast("GROUPS_FILTER",t)}),r()}}),define("groups/GroupsModule",["require","groups/GroupsDetailsCtrl","groups/GroupsRouter","groups/GroupsSearchCtrl","common/ResultsCtrl"],function(e){var t=e("groups/GroupsDetailsCtrl"),n=e("groups/GroupsRouter"),r=e("groups/GroupsSearchCtrl"),i=e("common/ResultsCtrl"),s=angular.module("GroupsModule",[]);s.config(["$stateProvider",n]),s.controller("GroupsDetailsCtrl",["$scope","$state","$stateParams","events","CkanService",t]),s.controller("GroupsResultsCtrl",["$scope","$state","$stateParams","CkanService","$location","events",i]),s.controller("GroupsSearchCtrl",["$rootScope","$scope","CkanService",r])}),define("organizations/OrganizationsDetailsCtrl",[],function(){return function(e,t,n,r,i){e.organization=i.organization(n.id),e.searching=!0,e.clear=function(){e.filter=""},e.selectDataset=function(e){t.go("datasets.details",{id:e})},e.$on(r.ORGANIZATIONS_RETRIEVED,function(){e.searching=!1,$(".organization-image img").load(function(){$(this).css({"margin-top":($(".organization-image").height()-$(this).height())/2})});for(var t=0;t<e.organization.packages.length;t++)if(e.organization.packages[t].tags)for(var n=0;n<e.organization.packages[t].tags.length;n++)switch(e.organization.packages[t].tags[n].name){case"salud":e.organization.packages[t].section="health";break;case"geoespacial":e.organization.packages[t].section="geospatial";break;case"seguridad-y-justicia":e.organization.packages[t].section="security";break;case"energia-y-medio-ambiente":e.organization.packages[t].section="energy";break;case"educacion":e.organization.packages[t].section="education";break;case"economia":e.organization.packages[t].section="economy";break;case"cultura-y-turismo":e.organization.packages[t].section="culture";break;case"finanzas-y-contrataciones":e.organization.packages[t].section="finance";break;case"infraestructura":e.organization.packages[t].section="infrastructure";break;case"desarrollo-sostenible":e.organization.packages[t].section="development";break;case"gobiernos-locales":e.organization.packages[t].section="government"}$(".breadcrumb li:last-child span").html(e.organization.title)})}}),define("organizations/OrganizationsRouter",[],function(){return function(e){e.state("organizations",{"abstract":!0,views:{"search-container":{templateUrl:"partials/datasets/search.html",controller:"OrganizationsSearchCtrl"}},data:{breadcrumbProxy:"organizations.results"}}).state("organizations.results",{url:"/instituciones/?page",views:{"datasets-sidebar":{templateUrl:"partials/datasets/filters.html"},"datasets-content":{templateUrl:"partials/organizations/results.html",controller:"OrganizationsResultsCtrl"}},reloadOnSearch:!1,data:{displayName:"Instituciones"}}).state("organizations.details",{url:"/instituciones/:id/?page",views:{"search-container@":{templateUrl:"partials/organizations/details.html",controller:"OrganizationsDetailsCtrl"}},data:{displayName:"Institución"}})}}),define("organizations/OrganizationsSearchCtrl",[],function(){return function(e,t,n,r){r.setModel("organizations");var i=function(){r.organizations()};t.clearSearch=function(){t.keyword=""},t.$on(r.getEvent("QUERY"),function(){t.count=r.getTotal()}),t.$watch("keyword",function(t){e.$broadcast("ORGANIZATIONS_FILTER",t)}),i()}}),define("organizations/OrganizationsModule",["require","common/ResultsCtrl","organizations/OrganizationsDetailsCtrl","organizations/OrganizationsRouter","organizations/OrganizationsSearchCtrl"],function(e){var t=e("common/ResultsCtrl"),n=e("organizations/OrganizationsDetailsCtrl"),r=e("organizations/OrganizationsRouter"),i=e("organizations/OrganizationsSearchCtrl"),s=angular.module("OrganizationsModule",[]);s.config(["$stateProvider",r]),s.controller("OrganizationsDetailsCtrl",["$scope","$state","$stateParams","events","CkanService",n]),s.controller("OrganizationsResultsCtrl",["$scope","$state","$stateParams","CkanService","$location","events",t]),s.controller("OrganizationsSearchCtrl",["$rootScope","$scope","$location","CkanService",i])}),define("app",["require","events","common/CommonModule","datasets/DatasetsModule","groups/GroupsModule","organizations/OrganizationsModule"],function(e){e("events"),e("common/CommonModule"),e("datasets/DatasetsModule"),e("groups/GroupsModule"),e("organizations/OrganizationsModule");var t=angular.module("ngCkan",["angularUtils.directives.uiBreadcrumbs","ngResource","ui.bootstrap.pagination","ui.bootstrap.tpls","ui.router","App.Events","CommonModule","DatasetsModule","GroupsModule","OrganizationsModule"]);return t.config(["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider",function(e,t,n){t.strictMode(!1),e.rule(function(e,t){var n=t.url();return n[n.length-1]==="/"||n.indexOf("/?")>-1?"":n.indexOf("?")>-1?n.replace("?","/?"):n+"/"}),e.otherwise("/conjuntos"),n.html5Mode(!1).hashPrefix("!")}]),t.run(["$rootScope","$state",function(e,t){e.$state=t,e.$on("$stateChangeSuccess",function(e,t){$(".nav-tabs li").removeClass("active");switch(t.name){case"datasets.results":case"datasets.details":$("#item-datasets").addClass("active");break;case"groups.results":case"groups.details":$("#item-groups").addClass("active");break;case"organizations.results":case"organizations.details":$("#item-organizations").addClass("active")}}),e.$on("$viewContentLoaded",function(){$("#site-spinner").fadeOut()})}]),t}),require.config(),define("main",["require","app"],function(e){var t=e("app"),n=angular.element(document.getElementsByTagName("html")[0]);angular.element().ready(function(){angular.bootstrap(n,[t.name])})});