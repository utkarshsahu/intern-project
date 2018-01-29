var express = require('express');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var router = express.Router();


function bedFilter(url2,bed){
  if(bed=='1'){
    url2.filters.and[2].equal.bedrooms=[1];
  }
  if(bed=='2'){
    url2.filters.and[2].equal.bedrooms=[2];
  }
  if(bed=='3'){
    url2.filters.and[2].equal.bedrooms=[3];
  }
  if(bed=='4'){
    url2.filters.and[2].equal.bedrooms=[4,5,6,7,8,9,10,11,12,13,14,15,16];
  }
}

function sortProp(url2,sort){
  if(sort=='ASC' || sort == 'DESC'){
    url2.sort[0].sortOrder=sort;
  }
  else if( sort=='relevance'){
    delete url2.sort;
  }
  else if(sort == 'popularity'){
    url2.sort[0].field="listingPopularityScore";
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //URL definitions

  var url1 = 'www.makaan.com/petra/app/v4/listing?selector=';
  var url2 =
  {"fields":
  ["localityId","displayDate","listing","property","project","builder","displayName","locality","suburb",
  "city","state","currentListingPrice","companySeller","company","user","id","name","label","listingId",
  "propertyId","projectId","propertyTitle","unitTypeId","resaleURL","description","postedDate",
  "verificationDate","size","measure","bedrooms","bathrooms","listingLatitude","listingLongitude",
  "studyRoom","servantRoom","pricePerUnitArea","price","localityAvgPrice","negotiable","rk","buyUrl",
  "rentUrl","overviewUrl","minConstructionCompletionDate","maxConstructionCompletionDate","halls",
  "facingId","noOfOpenSides","bookingAmount","securityDeposit","ownershipTypeId","furnished",
  "constructionStatusId","tenantTypes","bedrooms","balcony","floor","totalFloors","listingCategory",
  "possessionDate","activeStatus","type","logo","profilePictureURL","score","assist","contactNumbers",
  "contactNumber","isOffered","mainImageURL","mainImage","absolutePath","altText","title","imageCount",
  "geoDistance","defaultImageId","updatedAt","qualityScore","projectStatus","throughCampaign",
  "addedByPromoter","listingDebugInfo","videos","imageUrl","rk","penthouse","studio","paidLeadCount",
  "listingSellerTransactionStatuses","allocation","allocationHistory","masterAllocationStatus",
  "status","sellerCompanyFeedbackCount","companyStateReraRegistrationId"],
  "filters":{"and":[{"equal":{"cityId":11}},{"equal":{"listingCategory":["Primary","Resale"]}}]},
  "paging":{"start":0,"rows":20}};
  var url3 = '&includeNearbyResults=false&includeSponsoredResults=false&sourceDomain=Makaan';

  //filtering here

  var listingType = req.param('listingType');
  if(listingType!=undefined) {
    if(listingType=='Buy') {
      url2.filters.and[1].equal.listingCategory = ["Primary", "Resale"];//({"equal" : {"listingCategory" : ["Primary", "Resale"]}});
    }
    else {
      url2.filters.and[1].equal.listingCategory = ["Rental"];//({"equal" : {"listingCategory" : ["Rental"]}});

    }
  }

  var category = '';
  for (var i in url2.filters.and) {
    if (url2.filters.and[i].hasOwnProperty('equal')) {
      if(url2.filters.and[i].equal.hasOwnProperty('listingCategory')) {
        let categ = url2.filters.and[i].equal.listingCategory[0];
        if(categ== 'Primary' || categ=='Resale') {
          category = 'Buy';
        }
        else if(categ=='Rental') {
          category = 'Rent';
        }
        break;
      }
    }
  }

  var bed= req.param('bed');

  if(bed=='1' || bed=='2' || bed=='3' || bed=='4'){
    if(!url2.filters.and[2]){
      url2.filters.and.push({"equal" : {"bedrooms" : []}});
    }
    bedFilter(url2,bed);
  }

  var sorted= req.param('sort');
  if(sorted !==undefined){
    if(url2.sort == undefined){
      url2.sort=[{"field":"price","sortOrder":"DESC"}]
    }
    sortProp(url2,sorted);
  }


  var request = new XMLHttpRequest();
  var requestURL = 'https://'+url1+JSON.stringify(url2)+url3;
  request.onreadystatechange = function() {
	   if (this.readyState === 4) {
       var resp = JSON.parse(this.responseText);
       res.render('search', { 'title': 'Express', 'allList': resp.data[0].facetedResponse.items,
                  'category' : category || 'Select' , 'page' : req.originalUrl} );
     }
   };
   request.open('GET', requestURL);
   request.send();
});

module.exports = router;
