export const hasAccess = (name, type) => {
  var userDataLS = JSON.parse(localStorage.getItem('userDataLS'));
  if(userDataLS) {
    const module = userDataLS.role_id.access_module;
    let auth= module.find(x=>x.status==true && x.module==name)
    // debugger
    if(auth){
    // debugger
      return true
    }
      else{
      auth=module.find(x=>x.submodule.find(o=>o.name==type&&o.status==true))
      if(auth){ 
        return true
       }
      else{
        return false
        }
      }
    }
}