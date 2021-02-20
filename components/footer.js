const ComponentFooter = {
  name: 'ComponentFooter',
  data () {
    return { year: 0 }
  },
  mounted () {
    let date = new Date()
    this.year = date.getFullYear()
  },
  template: `<div class="container-fluid py-4 footer">
                   <div class="row">
                      <div class="col-12 d-flex align-items-center justify-content-center">Copyright
                         <span class="mx-3">&copy;</span> {{ year }}
                         <span class="mx-3">
                             <a href="javascript:void(0);" class="remember-pass">Privacy</a>
                         </span>
                         <span>
                             <a href="javascript:void(0);" class="remember-pass">Policy</a>
                          </span>
                      </div>
                   </div>
               </div>`
}
