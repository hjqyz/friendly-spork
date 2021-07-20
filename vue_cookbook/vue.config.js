module.exports={
    devServer: { 
        proxy: { 
             '/api': { 
                  /* 目标代理服务器地址 */ 
                   target: 'https://api.binstd.com/recipe', 
                    /* 允许跨域 */ 
                     changeOrigin: true, 
                      pathRewrite:{ 
                           "^/api":"" 
                         }},
               '/pic':{
                 /* 目标代理服务器地址 */ 
                   target: 'https://api.ixiaowai.cn/mcapi/mcapi.php', 
                   /* 允许跨域 */ 
                    changeOrigin: true, 
                     pathRewrite:{ 
                          "^/pic":"" 
                        }
                         }
} }}