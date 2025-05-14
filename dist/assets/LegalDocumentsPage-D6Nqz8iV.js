import{j as e}from"./ui-gc11a3NY.js";import{r as _}from"./vendor-DWuuxECy.js";import{L as j,I as A}from"./Layout-qNRcknfe.js";import{T as P,a as T,b as R,c as E}from"./tabs-BNQ2ARQy.js";import{C as y,a as g,d as x,b as L,c as O}from"./card-DHorRUo3.js";import{u as Y,B as C}from"./index-BO5xaCed.js";import{d as n}from"./api-DpYaj9Mj.js";import{S as F,F as k}from"./search-DkuEgwjB.js";import{I as w}from"./info-BEUTfjl3.js";import{D as M}from"./download-opG6Tg0f.js";const z=()=>{const{toast:l}=Y(),[a,b]=_.useState(""),[s,v]=_.useState("all"),[N,c]=_.useState([]),[d,I]=_.useState([{id:"all",name:"All Documents"}]),[S,m]=_.useState(!0),[u,f]=_.useState(null);_.useEffect(()=>{(async()=>{try{m(!0);const o=await n.getDocumentCategories();o.success&&I([{id:"all",name:"All Documents"},...o.categories]);const r=await n.getAllDocuments();r.success?c(r.documents):f("Failed to load documents")}catch(o){console.error("Error fetching document data:",o),f("Failed to load documents. Please try again later.")}finally{m(!1)}})()},[]),_.useEffect(()=>{(async()=>{if(s==="all")try{const o=await n.getAllDocuments();o.success&&c(o.documents)}catch(o){console.error("Error fetching all documents:",o)}else try{const o=await n.getAllDocuments(s);o.success&&c(o.documents)}catch(o){console.error(`Error fetching ${s} documents:`,o)}})()},[s]),_.useEffect(()=>{const t=async()=>{if(a.trim().length>0)try{const r=await n.getAllDocuments(s,a);r.success&&c(r.documents)}catch(r){console.error("Error searching documents:",r)}},o=setTimeout(()=>{a.trim().length>0&&t()},500);return()=>clearTimeout(o)},[a]);const D=t=>{try{l({title:"Sample Document Download",description:`Downloading ${t.title} (${t.format})`});let o="";t.category==="templates"?t.title.toLowerCase().includes("complaint")?o=`
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Company Name]
[Company Address]
[City, State ZIP]

Subject: Complaint Regarding [Product/Service]

Dear Sir/Madam,

I am writing to express my dissatisfaction with [product/service] that I purchased from your company on [date of purchase]. The [product/service] was purchased from [location/website] with [receipt/order number].

Issue Description:
[Provide detailed description of the issue, including:
- What exactly is wrong with the product/service
- When you first noticed the problem
- Any attempts you've made to resolve the issue
- Reference to any previous communication]

As per the Consumer Protection Act, 2019, I am entitled to [specify the remedy you're seeking: replacement, repair, refund, compensation, etc.]. I have attached copies of [mention any supporting documents: receipts, warranty cards, previous correspondence, etc.] for your reference.

I request you to resolve this matter within [specify reasonable timeframe, e.g., 15 days] from the receipt of this letter. If I do not receive a satisfactory response within this period, I will be compelled to seek redressal through the appropriate consumer forum.

I look forward to your prompt action and a satisfactory resolution.

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`:t.title.toLowerCase().includes("refund")?o=`
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Company Name]
[Company Address]
[City, State ZIP]

Subject: Refund Request for [Product/Service]

Dear Sir/Madam,

I am writing to request a refund for [product/service] that I purchased from your company on [date of purchase]. The [product/service] was purchased from [location/website] with [receipt/order number].

Reason for Refund:
[Provide detailed explanation for requesting a refund, such as:
- Product defects or issues
- Service not as described
- Delivery issues
- Other valid reasons]

As per your refund policy and the Consumer Protection Act, 2019, I am entitled to a full refund. I have attached copies of [mention any supporting documents: receipts, order confirmation, etc.] for your reference.

Please process the refund to [specify refund method - original payment method, bank account, etc.] within [specify reasonable timeframe, e.g., 7-15 days] from the receipt of this letter.

I look forward to your prompt action on this matter.

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`:o=`
[Your Name]
[Your Address]
[City, State ZIP]
[Your Email]
[Your Phone]

[Date]

[Recipient Name/Organization]
[Recipient Address]
[City, State ZIP]

Subject: [Clear Subject Line Related to Document Purpose]

Dear [Recipient Name/Sir/Madam],

[Introduction paragraph explaining the purpose of the document]

[Main body with detailed information, requests, or statements]

[Closing paragraph with expected action or follow-up]

Sincerely,

[Your Signature]
[Your Name]
[Your Contact Information]
`:t.category==="guides"||t.category==="educational"?o=`
# ${t.title}

## Introduction
This guide provides information about consumer rights and protections under the Consumer Protection Act, 2019 in India.

## Key Consumer Rights
1. Right to Safety
2. Right to Information
3. Right to Choose
4. Right to be Heard
5. Right to Seek Redressal
6. Right to Consumer Education

## How to File a Consumer Complaint
1. First approach the business/service provider directly
2. If unresolved, file a written complaint with the appropriate consumer forum
3. Gather all evidence including receipts, warranty cards, and correspondence
4. Submit your complaint with the required fee
5. Attend hearings as scheduled

## Consumer Forums
- District Consumer Disputes Redressal Forum: For claims up to ₹1 crore
- State Consumer Disputes Redressal Commission: For claims between ₹1-10 crores
- National Consumer Disputes Redressal Commission: For claims above ₹10 crores

## Important Timeframes
- Limitation period for filing complaints: 2 years from date of cause of action
- Expected timeframe for resolution: 3-5 months (may vary)

## Contact Information
National Consumer Helpline: 1800-11-4000
Website: www.consumerhelpline.gov.in

## Disclaimer
This document is for informational purposes only and does not constitute legal advice.
`:t.category==="forms"?o=`
# ${t.title}

## CONSUMER COMPLAINT FORM

1. COMPLAINANT DETAILS:
   Name: _______________________________
   Address: ____________________________
   City: _____________ State: ___________
   PIN: _____________ Phone: ____________
   Email: ______________________________

2. RESPONDENT DETAILS:
   Name of Company/Service Provider: ____________________
   Address: _________________________________________
   City: _____________ State: ___________
   PIN: _____________ Phone: ____________
   Email (if known): _______________________

3. COMPLAINT DETAILS:
   Date of Purchase/Service: ___/___/______
   Amount Paid: ₹______________
   Mode of Payment: □ Cash □ Credit Card □ Debit Card □ UPI □ Other
   Invoice/Receipt Number: _________________
   
4. NATURE OF COMPLAINT:
   □ Defective Product
   □ Poor Service Quality
   □ Unfair Trade Practice
   □ Misleading Advertisement
   □ Overcharging
   □ Other (specify): _______________________

5. COMPLAINT DESCRIPTION:
   _____________________________________________
   _____________________________________________
   _____________________________________________
   _____________________________________________

6. RELIEF SOUGHT:
   □ Replacement of Product
   □ Repair of Product
   □ Refund
   □ Compensation (Amount: ₹_____________)
   □ Other (specify): _______________________

7. DOCUMENTS ATTACHED:
   □ Copy of Invoice/Receipt
   □ Copy of Warranty Card
   □ Photographs of Defective Product
   □ Previous Correspondence with Respondent
   □ Other (specify): _______________________

8. DECLARATION:
   I/We declare that the information provided above is true to the best of my/our knowledge and belief.

   Date: ___/___/______
   Place: ______________
   
   Signature of Complainant: _______________________
`:t.category==="legal"?o=`
# ${t.title}

## LEGAL NOTICE

WITHOUT PREJUDICE

Date: [Current Date]

To,
[Name of Recipient]
[Address of Recipient]
[City, State, PIN]

Subject: Legal Notice for [Brief Description of Issue]

Dear Sir/Madam,

Under instructions from and on behalf of my client, [Client's Name], residing at [Client's Address], I hereby serve you with the following legal notice:

1. FACTS OF THE CASE:
   [Detailed chronological description of the events leading to the dispute]

2. LEGAL VIOLATIONS:
   Your actions/omissions constitute violations of the following provisions:
   a) Section [Number] of the Consumer Protection Act, 2019
   b) [Any other relevant laws or regulations]
   c) [Terms of contract/warranty/guarantee if applicable]

3. DEMAND:
   In view of the above, my client hereby demands that you:
   a) [Specific demand - e.g., refund, replacement, compensation]
   b) [Any other specific action required]
   c) [Timeline for compliance]

4. CONSEQUENCES OF NON-COMPLIANCE:
   Please note that if you fail to comply with the above demands within [Number] days from the receipt of this notice, my client will be constrained to initiate appropriate legal proceedings against you in the appropriate forum, including but not limited to filing a complaint before the Consumer Disputes Redressal Commission, without any further notice.

   In such an event, you will be liable for all costs, damages, and legal expenses incurred by my client.

5. RESERVATION OF RIGHTS:
   This notice is without prejudice to any other rights or remedies available to my client under the law.

Yours faithfully,

[Lawyer's Name]
Advocate
[Registration Number]
[Contact Information]
`:o=`Sample content for ${t.title}

This is a placeholder for the actual content of the document.`;const r=new Blob([o],{type:"text/plain"}),p=URL.createObjectURL(r),i=t.createElement("a");i.href=p,i.download=`${t.title}.txt`,t.body.appendChild(i),i.click(),t.body.removeChild(i),URL.revokeObjectURL(p)}catch(o){console.error("Error downloading document:",o),l({title:"Download failed",description:"There was an error downloading the document. Please try again.",variant:"destructive"})}},h=N.filter(t=>{const o=a.trim().length===0||t.title.toLowerCase().includes(a.toLowerCase())||t.description.toLowerCase().includes(a.toLowerCase()),r=s==="all"||t.category===s;return o&&r});return e.jsxs(j,{children:[e.jsx("section",{className:"bg-gradient-to-r from-primary/20 to-primary/10 py-16",children:e.jsx("div",{className:"container-custom",children:e.jsxs("div",{className:"max-w-3xl mx-auto text-center",children:[e.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-6 text-foreground",children:"Legal Documents & Templates"}),e.jsx("p",{className:"text-xl mb-8 text-muted-foreground",children:"Access free templates, forms, and guides to help you navigate consumer issues"}),e.jsxs("div",{className:"relative max-w-xl mx-auto",children:[e.jsx(A,{type:"text",placeholder:"Search for documents...",className:"pl-10 py-6 bg-background text-foreground w-full rounded-full",value:a,onChange:t=>b(t.target.value)}),e.jsx(F,{className:"absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"})]})]})})}),e.jsx("section",{className:"py-12 bg-background",children:e.jsx("div",{className:"container-custom",children:e.jsxs(P,{defaultValue:"all",onValueChange:t=>v(t),children:[e.jsx("div",{className:"flex justify-between items-center mb-8",children:e.jsx(T,{children:d.map(t=>e.jsx(R,{value:t.id,children:t.name},t.id))})}),d.map(t=>e.jsxs(E,{value:t.id,children:[e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:S?Array(6).fill(0).map((o,r)=>e.jsxs(y,{className:"card-hover",children:[e.jsxs(g,{children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsx("div",{className:"h-8 w-8 bg-primary/20 rounded animate-pulse"}),e.jsx("div",{className:"h-6 w-16 bg-primary/20 rounded animate-pulse"})]}),e.jsx("div",{className:"h-6 w-3/4 bg-muted animate-pulse rounded mt-2"}),e.jsx("div",{className:"h-4 w-full bg-muted/50 animate-pulse rounded mt-2"})]}),e.jsx(x,{children:e.jsx("div",{className:"h-9 w-full bg-primary/20 rounded animate-pulse"})})]},`skeleton-${r}`)):u?e.jsxs("div",{className:"col-span-3 text-center py-16",children:[e.jsx(w,{className:"h-12 w-12 text-destructive mx-auto mb-4"}),e.jsx("h3",{className:"text-xl font-semibold text-foreground mb-2",children:"Error Loading Documents"}),e.jsx("p",{className:"text-muted-foreground max-w-md mx-auto mb-4",children:u}),e.jsx(C,{onClick:()=>window.location.reload(),children:"Try Again"})]}):h.filter(o=>t.id==="all"||o.category===t.id).map(o=>e.jsxs(y,{className:"card-hover",children:[e.jsxs(g,{children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsx(k,{className:"h-8 w-8 text-primary mb-2"}),e.jsx("span",{className:"text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded",children:o.format})]}),e.jsx(L,{className:"text-foreground",children:o.title}),e.jsx(O,{children:o.description})]}),e.jsx(x,{children:e.jsxs(C,{onClick:()=>D(o),className:"w-full flex justify-center items-center",children:[e.jsx(M,{className:"mr-2 h-4 w-4"}),"Download"]})})]},o.document_id))}),h.filter(o=>t.id==="all"||o.category===t.id).length===0&&e.jsxs("div",{className:"text-center py-16",children:[e.jsx(w,{className:"h-12 w-12 text-muted-foreground mx-auto mb-4"}),e.jsx("h3",{className:"text-xl font-semibold text-foreground mb-2",children:"No documents found"}),e.jsx("p",{className:"text-muted-foreground max-w-md mx-auto",children:"Try adjusting your search query or check another category"})]})]},t.id))]})})})]})};export{z as default};
