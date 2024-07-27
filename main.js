// (setq js-indent-level 1)  # for Emacs

function get_page_from_url() {
 let href = window.location.href;
 let url = new URL(href);
 let search = url.search  // ?T,S  T = Taranga number, S = Shloka number
 // console.log('get_page_from_url: search=',search)
 let ts = search.substr(1)  // drop initial ?
 
 // ts = ts.replace(/\D/g, ''); // remove non-digits
 let page = kssdata1[ts]; // may be 'undefined'
 if (page === undefined) {
  page = kssdata2[ts]; // may still be 'undefined'
 }
 return [ts,page]
}

function get_verse_html(ts,page) {
 // let nnn = page.padStart(3,'0');
 // let pdfcur = `pg_${nnn}.pdf`;
 let pdfcur = `${page}.pdf`
 let urlcur = `pdfpages/${pdfcur}`;
 let android = ` <a href='${urlcur}' style='position:relative; left:100px;'>Click to load pdf</a>`;
 let imageElt = `<object id='servepdf' type='application/pdf' data='${urlcur}' 
              style='width: 98%; height:98%'> ${android} </object>`;
 // return imageElt;
 let style = `font-size: smaller; font-weight:bold;`;
 let tsElt = `<p style="${style}">taraṃga,śloka = ${ts}</p>`;
 let ans = tsElt + imageElt;
 return ans;
}

function display_verse_html(ts,page) {
 //verse_id(indexes);
 let html = get_verse_html(ts,page);
 let elt=document.getElementById('verse');
 elt.innerHTML = html;
}

function get_unknown_html(ts) {
 let style = `font-size: smaller; font-weight:bold; color:red;`;
 let elt = `<p style="${style}">Unknown taraṃga,śloka: ${ts}</p>`;
 return elt;
}
function display_unknown_html(ts) {
 let html = get_unknown_html(ts)
 let elt=document.getElementById('verse');
 elt.innerHTML = html;
}
function display_verse_url() {
 let [ts,page] = get_page_from_url();
 //console.log('ts=',ts,'page=',page)
 
 if (page === undefined) {
  display_unknown_html(ts);
 } else {
  display_verse_html(ts,page)
 }
}

document.getElementsByTagName("BODY")[0].onload = display_verse_url;
