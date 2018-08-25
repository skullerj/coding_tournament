'use strict';

const multiparty = require('multiparty');
const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'chupemos-com',
  api_key: '883129875164339',
  api_secret: '4Nvf7zT0JFsbywIrGqlauuf8wv0'
});

/**
 * Helper method which takes the request object and returns a promise with a file.
 */
const getFileFromRequest = (req,cb)=>{
  const form = new multiparty.Form();
  form.parse(req,(err,fields,files)=>{
    if(err){
      console.log('No se ha enviado ninguna foto');
      return cb(null,null);
    }
    const file = files['file'][0];
    if (!file) return cb(null,null);
    return cb(null,file);
  });
};

module.exports = function(Event) {

  Event.send = (description,type,date,lat,lng,req,cb) => {
    let newEvent = {
      description:description,
      type:type,
      date: new Date(date),
      location: {
        lat:parseFloat(lat),
        lng:parseFloat(lng)
      }
    };
    getFileFromRequest(req,(err,file)=>{
      if(err)return cb(err);
      if(file){
        cloudinary.uploader.upload(file.path,(result)=>{
          newEvent.imageUrl=result.url;
          Event.create(newEvent,(err,result)=>{
            if(err)return cb(err);
            return cb(null,result);
          });
        });
      }else{
        Event.create(newEvent,(err,result)=>{
          if(err)return cb(err);
          return cb(null,result);
        });
      }
    });
  };

  Event.remoteMethod('send', {
    http: {path: '/send', verb: 'post'},
    accepts: [
      { arg: 'description', type: 'string', required: true ,http: { source: 'path' }},
      { arg: 'type', type: 'string', required: true ,http: { source: 'path' }},
      { arg: 'date', type: 'string', required: true ,http: { source: 'path' }},
      { arg: 'lat', type: 'number', required: true ,http: { source: 'path' }},
      { arg: 'lng', type: 'number', required: true ,http: { source: 'path' }},
      { arg: 'req', type: 'object', http: { source: 'req' } }
    ],
    returns: { root: true, type: 'object' }
  });


};
