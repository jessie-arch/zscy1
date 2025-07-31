import Mock from 'mockjs';
//生成周的范围
function WeekRange(){
     const ranges = [
        [1,2,3,4,5,6,7,8, 9],
        [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        [10,11,12,13,14,15,16,17, 18]
    ];
    const randomRange = Mock.Random.pick(ranges);
    return randomRange;
}

 
 function detailtime (index){ 
              const detailtime = ['0','8:00-9:40','0','10:15-11:55','0','14:00-15:40','0','16:15-18:55','0','19:00-20:40','0','20:50-22:30'];
               return detailtime[index];//课程时间
            }

//生成课程数据
const MockSchedule = Mock.mock({

'course|8-12':[{
    'id|+1':1,//课程id
    'weekRange':function() {
                return WeekRange();
            }, //课程周期
    'weektime':function(){
              const weektime1=this.weekRange[0];
              const weektime2=this.weekRange[this.weekRange.length-1];
              return `${weektime1}-${weektime2}周`;
            },
            'sectionStart':function(){//开始的节数
    const section=[1,3,5,7,9,11]
 return Mock.Random.pick(section);
},
     'detailtime':function(){
         return detailtime(this.sectionStart);
     },
    'teacherName':'@cname',//教师姓名
    'courseName':'@ctitle(5,6)',//课程名称
'weekday':'@integer(1,7)',//周几

'sectionEnd':function(){//结束的节数，
    return this.sectionStart+1;
},
'room':'@string("number",4)',
'type':'@pick(["必修","选修"])'
}],
'custom':[]
})

  


//拦截
//获取
Mock.mock('/api/courses', 'get', () => ({
  code: 200,
  data: MockSchedule.course
}));


Mock.mock('/api/custom', 'get', () => ({
  code: 200,
  data: MockSchedule.custom
}));
//添加
 Mock.mock('/api/custom', 'post', (options) => {
    try {
      const newItem = JSON.parse(options.body);
      newItem.id = Mock.Random.integer(100, 999); 
      MockSchedule.custom.push(newItem);
      return {
        code: 200,
        data: newItem,
        message: '添加成功',
      }

    } catch (error) {
      return {
        code: 400,
        message: '无效的JSON数据',
       
      }
    }
  });
  //删除
 Mock.mock(/\/api\/custom\/\d+/, 'put', (options) => {
    const id = parseInt(options.url.match(/\d+/)[0]);
    const index = MockSchedule.custom.findIndex(item => item.id === id);
    if (index === -1) return {
        code: 404,
        message: '未找到对应的自定义活动',
      }
    
    const update = JSON.parse(options.body);
  mockData.custom[index] = { ...mockData.custom[index], ...update, id };
  return {
    code: 200,
    data: mockData.custom[index],
    message: '更新成功'
  };
});
    Mock.mock(/\/api\/custom\/\d+/, 'delete', (options) => {
    const id = parseInt(options.url.match(/\d+/)[0]);
    mockData.custom = mockData.custom.filter(item => item.id !== id);
     return {
    code: 200,
    message: '删除成功'
  };
  });

export default MockSchedule;