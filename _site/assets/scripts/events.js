const events={DOMContentLoaded:[onMissingMemberPhoto,highlightCode,scrollToPost,fixTitleCase,setLinkTargetBlank,anchors],load:[setupInitiativeGrid,lightcaseifyArticle,finalizeButtons,closeFab],scroll:[]};for(let[e,t]of Object.entries(events))t.forEach(t=>{window.addEventListener(e,t)});