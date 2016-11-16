(function(w){

    function pie(x,y,r,data){
        this.x=x;
        this.y=y;
        this.r=r;
        this.data=data;
        this.colors=["red","deeppink","yellow","skyblue","green","orange"];
        this.init();
    };

    pie.hudu=function(n1){
        return Math.PI/180*n1;
    };

    pie.prototype={

        constructor:pie,

        init:function(){
            var num=0;
            this.data.forEach(function(dataObj){
                num=num+dataObj.val;
            });

            this.jiaoduzhi=360/num;
        },

        draw:function(){
            var self=this;
               var zongjiaodu= 0;  //总角度
               var kaishi= 0;    //开始角度
               var jieshu= 0;    //结束角度


            this.data.forEach(function(val,index){

                zongjiaodu=self.jiaoduzhi*self.data[index].val;

                jieshu=kaishi+zongjiaodu;

                n2.beginPath();
                n2.moveTo(self.x,self.y);
                n2.arc(self.x, self.y, self.r, pie.hudu(kaishi), pie.hudu(jieshu));
                n2.closePath();
                n2.fillStyle=self.colors[index];
                n2.fill();

                n2.beginPath();
                //* 在扇形中间画线:
                //    * 需要先求出扇形中间的角度 = 扇形的起点角度 + 扇形的角度 / 2
                //    * 然后求出扇形中间在圆上的点坐标：
                //* x坐标 = 圆心x坐标 + 半径 * Math.cos( angleToRadian(扇形中间的角度) );
                //* y坐标 = 圆心y坐标 + 半径 * Math.sin( angleToRadian(扇形中间的角度) );
                //* 有了该坐标，从圆心拉一条线到该点即可。

                var jd=kaishi+zongjiaodu/2;
                var temmx=self.x+self.r*Math.cos(pie.hudu(jd));
                var temmy=self.y+self.r*Math.sin(pie.hudu(jd));

                var temx=self.x+(self.r+15)*Math.cos(pie.hudu(jd));
                var temy=self.y+(self.r+15)*Math.sin(pie.hudu(jd));

                n2.moveTo(temmx,temmy);
                n2.lineTo(temx,temy);

                if(jd>90 && jd<270){
                    n2.textAlign="right";
                    n2.lineTo(temx-n2.measureText(self.data[index].msg).width,temy);
                }else{
                    n2.textAlign="left";
                    n2.lineTo(temx+n2.measureText(self.data[index].msg).width,temy);

                }
                n2.stroke();
                n2.textBaseline = 'bottom';
                n2.fillText( self.data[index].msg, temx, temy - 5 );


                kaishi=jieshu;

            });

        },

    };
    w.pie=pie;
} (window));
