# cdf-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 接口说明

- post的data格式为form表单格式
- 所有操作正常的返回code为200
- 未登录的是601
- 登陆逻辑：
  - 接口都要从cookie里取值来做统一校验，名称为_token=1234，我需要判断该值是否存在
  - 登陆成功后我会写cookie，或者你写也是可以的；要返回登陆成功人员的信息
  - cookie有效期为1天

- 其它异常的错误，比如是你接口的错误最好以5开头，比如5001
- 是我这边参数错误，以4开头，比如4001

### 接口文件

目录为resource/index.js，里面有个mock参数，来控制所有的接口是否走mock；
如果想部分接口调试，可以将mock=false，然后接口里加上mock=true的参数来mock该接口

`export default`部分才是你要关心的，比如login，需要在url字段里加上完整的地址，
然后在下面定义该方法是get还是post

