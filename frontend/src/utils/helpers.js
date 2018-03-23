function toObject(arr){
  return arr.reduce((obj, item) => {
     obj[item.id] = item
     return obj
   }, {})
 }

export default toObject
