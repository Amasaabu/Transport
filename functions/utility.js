 const toObjectAndDelete = (obj, ...args)=>{
   const obj_document = obj.toObject()
   for (const iterator of args) {
      const iterator_array = iterator.split('.')
      if (iterator_array.length >1) {
         console.log('greater than 1');
         delete obj_document[iterator_array[0]][iterator_array[1]]
      } else {
         delete obj_document[iterator_array[0]]
      }
   }
   return obj_document
}

module.exports = {
   toObjectAndDelete
}