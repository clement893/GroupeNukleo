import{j as e,$ as F}from"./react-core-DGtJfnc9.js";import{k as p,u as v,r as S,P as u,L as i,a as k}from"./leo-C-VUqNlC.js";import{c as N,S as w,a as G}from"./index-BJEJo157.js";import"./vendor-CEcHKfzj.js";import"./trpc-vendor-iSAgRDmq.js";import"./react-query-vendor-CeteAeTR.js";import"./radix-vendor-BcxbYqwV.js";import"./react-dom-BHuCX__d.js";import"./react-scheduler-7OC5HNn7.js";import"./react-dom-client-BXV-ajzI.js";import"./services-wBNd2cOw.js";import"./admin-DbK_7iMi.js";const T="linear-gradient(to right, #6B1817, #523DCB)";function q(){const[f,h]=p("/resources/:id"),[b,y]=p("/fr/resources/:id"),{t:s,language:A}=v(),o=S(),t=(f?h:b?y:null)?.id||"",d={"agentic-ai-playbook":"agenticPlaybook","pilot-to-scale":"pilotToScale","agentic-marketing":"agenticMarketing","building-agentic-systems":"buildingAgentic","roi-ai-investment":"roiInvestment"},r=d[t];if(!r||!t)return e.jsx(u,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:34",children:e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:35",className:"min-h-screen flex items-center justify-center",style:{background:"transparent"},children:e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:36",className:"text-center",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:[e.jsx("h1",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:37",className:"text-2xl font-bold text-gray-900 mb-4",children:s("resources.articleNotFound")||"Article non trouvé"}),e.jsx(i,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:38",href:o("/resources"),className:"text-[#5A1E29] hover:underline font-medium",children:s("resources.backToResources")||"Retour aux ressources"})]})})});const a=s(`resources.articles.${r}.title`),c=s(`resources.articles.${r}.description`),R=s(`resources.articles.${r}.readTime`),n=s(`resources.articles.${r}.content`,{returnObjects:!1})||c;if(!a||a.trim()==="")return e.jsx(u,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:52",children:e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:53",className:"min-h-screen flex items-center justify-center",style:{background:"transparent"},children:e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:54",className:"text-center",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:[e.jsx("h1",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:55",className:"text-2xl font-bold text-gray-900 mb-4",children:s("resources.articleNotFound")||"Article non trouvé"}),e.jsx(i,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:56",href:o("/resources"),className:"text-[#5A1E29] hover:underline font-medium",children:s("resources.backToResources")||"Retour aux ressources"})]})})});const m={"agentic-ai-playbook":"2025-01-15","pilot-to-scale":"2025-01-12","agentic-marketing":"2025-01-10","building-agentic-systems":"2025-01-10","roi-ai-investment":"2025-01-05"}[t]||"2025-01-01",j=N({description:c,datePublished:m,author:{name:"Nukleo Digital",url:"https://nukleodigital-production.up.railway.app"},url:`https://nukleodigital-production.up.railway.app/resources/${t}`});return e.jsxs(u,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:82",children:[e.jsx(k,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:83",title:`${a} | ${s("resources.seoTitle")||"Ressources"}`,description:c,keywords:s("resources.seoKeywords")}),e.jsx(w,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:88",data:j}),e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:89",className:"min-h-screen",style:{background:"transparent"},children:[e.jsx("section",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:91",style:{padding:"clamp(5rem, 10vh, 7rem) 0 2rem"},children:e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:92",className:"container",children:[e.jsxs(i,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:93",href:o("/resources"),className:"inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors group",style:{fontFamily:"'Google Sans Flex', sans-serif",fontSize:"0.9rem",fontWeight:500},children:[e.jsx(F,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:94",className:"w-4 h-4 group-hover:-translate-x-0.5 transition-transform"}),s("resources.backToResources")||"Retour aux ressources"]}),e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:98",style:{marginBottom:"1rem"},children:e.jsx("span",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:99",style:{display:"inline-block",padding:"4px 12px",borderRadius:999,fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6b7280",background:"#f3f4f6",fontFamily:"'Google Sans Flex', sans-serif"},children:s(`resources.articles.${r}.category`)||"Article"})}),e.jsx("h1",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:117",style:{fontFamily:"'Google Sans Flex', sans-serif",fontWeight:700,fontSize:"clamp(2rem, 4.5vw, 3.5rem)",lineHeight:1.2,letterSpacing:"-0.02em",margin:"0 0 1rem 0",paddingBottom:"0.2em",overflow:"visible",background:T,WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent",display:"inline-block"},children:a}),e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:138",className:"flex items-center gap-3 text-gray-500 text-sm",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:[e.jsx("span",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:139",className:"font-medium",children:R}),e.jsx("span",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:140",children:"·"}),e.jsx("span",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:141",children:new Date(m).toLocaleDateString(A==="fr"?"fr-FR":"en-US",{month:"long",day:"numeric",year:"numeric"})})]})]})}),e.jsx("section",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:147",style:{padding:"0 0 4rem"},children:e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:148",className:"container",children:e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:149",className:"w-full",children:e.jsxs("article",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:150",style:{background:"#fff",border:"1px solid #e5e7eb",borderRadius:16,boxShadow:"0 2px 12px rgba(0,0,0,0.04)",padding:"2rem 1.75rem",fontFamily:"'Google Sans Flex', sans-serif"},children:[e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:160",className:"mb-8 pb-8 border-b border-gray-200",children:e.jsx("p",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:161",className:"text-lg text-gray-700 leading-relaxed m-0",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:c})}),n&&n!==c&&e.jsxs(e.Fragment,{children:[e.jsx("style",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:168",children:`
                      .article-content-resources h2 {
                        font-family: 'Google Sans Flex', sans-serif;
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #111827;
                        margin-top: 2.5rem;
                        margin-bottom: 1rem;
                        padding-left: 1rem;
                        border-left: 4px solid transparent;
                        border-image: linear-gradient(to right, #6B1817, #523DCB) 1;
                      }
                      .article-content-resources h3 {
                        font-family: 'Google Sans Flex', sans-serif;
                        font-size: 1.25rem;
                        font-weight: 600;
                        color: #111827;
                        margin-top: 2rem;
                        margin-bottom: 0.75rem;
                      }
                      .article-content-resources h4 {
                        font-family: 'Google Sans Flex', sans-serif;
                        font-size: 1.1rem;
                        font-weight: 600;
                        color: #374151;
                        margin-top: 1.5rem;
                        margin-bottom: 0.5rem;
                      }
                      .article-content-resources p {
                        font-family: 'Google Sans Flex', sans-serif;
                        margin-bottom: 1.25rem;
                        line-height: 1.7;
                        color: #4b5563;
                      }
                      .article-content-resources ul,
                      .article-content-resources ol {
                        margin-bottom: 1.5rem;
                        padding-left: 1.5rem;
                      }
                      .article-content-resources li {
                        margin-bottom: 0.5rem;
                        line-height: 1.65;
                        color: #4b5563;
                      }
                      .article-content-resources li::marker {
                        color: #5A1E29;
                      }
                      .article-content-resources strong {
                        color: #111827;
                        font-weight: 600;
                      }
                      .article-content-resources a {
                        color: #5A1E29;
                        text-decoration: none;
                        font-weight: 500;
                      }
                      .article-content-resources a:hover {
                        text-decoration: underline;
                      }
                      .article-content-resources blockquote {
                        border-left: 4px solid #e5e7eb;
                        padding-left: 1.25rem;
                        margin: 1.5rem 0;
                        color: #6b7280;
                        font-style: italic;
                      }
                    `}),e.jsx(G,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:235",html:n,className:"article-content-resources",style:{fontFamily:"'Google Sans Flex', sans-serif"}})]}),e.jsxs("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:243",className:"mt-12 pt-8 border-t border-gray-200",children:[e.jsx("h2",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:244",className:"text-xl font-bold text-gray-900 mb-4",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:s("resources.relatedArticles")||"Articles similaires"}),e.jsx("div",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:247",className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:Object.entries(d).filter(([l])=>l!==t).slice(0,2).map(([l,g])=>{const x=s(`resources.articles.${g}.title`);return x?e.jsxs(i,{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:254",href:o(`/resources/${l}`),className:"block p-4 rounded-xl border border-gray-200 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-300 transition-all",style:{fontFamily:"'Google Sans Flex', sans-serif"},children:[e.jsx("h3",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:255",className:"font-semibold text-gray-900 hover:text-[#5A1E29] transition-colors mb-1",children:x}),e.jsx("p",{"data-loc":"client\\src\\pages\\resources\\ResourceArticle.tsx:258",className:"text-gray-600 text-sm line-clamp-2 m-0",children:s(`resources.articles.${g}.description`)})]},l):null})})]})]})})})})]})]})}export{q as default};
