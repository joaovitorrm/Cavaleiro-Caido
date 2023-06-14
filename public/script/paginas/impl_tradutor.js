//This function will be called when user click changing language
function implTradutor(lng, tagAttr){
    let translate = new Translate();
    translate.init(tagAttr, lng);
    translate.process();
    if(lng == 'en'){
      $("#enTranslator").css('color', '#f4623a');
      $("#khTranslator").css('color', '#212529');
    } 
    if(lng == 'kh'){
      $("#khTranslator").css('color', '#f4623a');
      $("#enTranslator").css('color', '#212529');
    }
}
$(document).ready(function(){
  //This is id of HTML element (English) with attribute lng-tag
  $("#enTranslator").click(function(){
    translate('en', 'lng-tag');
  });
  //This is id of HTML element (Khmer) with attribute lng-tag
  $("#khTranslator").click(function(){
    translate('kh', 'lng-tag');
  });
});