if (!document.body.contains(document.getElementsByName('XmlText')[0]) || document.body.contains(document.getElementById('bkLoadSaveXML'))) return;
var bkScrCode=`
function bkSaveXml(xmlbox) {
    var xmltext = xmlbox.value;
    var outfile = document.createElement('a');
    var filename = document.getElementById('idHeaderTitleCell').innerText;
    outfile.href = 'data:text/xml;charset=utf-8,' + encodeURIComponent(xmltext);
    outfile.download = filename+".xml";
    outfile.click();
};

function bkLoadXml(xmlbox) {
    var infile = document.createElement('input');
    infile.type = 'file';
    infile.id = 'xmlLoad';
    infile.accept = 'text/xml';
    document.body.appendChild(infile);
    infile.addEventListener('change', function() {
        const newxml = new FileReader();
        newxml.onload = function() {
            xmlbox.value = newxml.result;
            var apply = confirm("New xml analysis loaded: press OK to apply it");
            if (apply) {
                document.getElementById('advancedTabApplyXmlButton').click();
                return;
                } else {
                return;
                }
            };
        newxml.readAsText(this.files[0]);
        });
    infile.click();
};`;
if (!document.body.contains(document.getElementById('bk-script'))) {
    var bkScript = document.createElement('script');
    bkScript.id = "bk-script";
    bkScript.type  = "text/javascript";
    bkScript.text = bkScrCode;
    document.body.appendChild(bkScript);
};
var bkButtons=`<span id="bkLoadSaveXML" class="masterToolbarTextButton minibuttonOn"><span id="bkTitle" onMouseOver="this.style.color='#000';">AnalyticsLoadSave Bookmarklet: </span><a id="bkSave" onclick="var xmlbox = document.getElementsByName('XmlText')[0]; bkSaveXml(xmlbox);" href="javascript:void(null)">Save XML</a> | <a id="bkLoad" onclick="var xmlbox = document.getElementsByName('XmlText')[0]; bkLoadXml(xmlbox);" href="javascript:void(null)">Load XML</a></span>`;
var xmlBtn = document.getElementById('advancedTabApplyXmlButton');
xmlBtn.insertAdjacentHTML('beforebegin', bkButtons);
