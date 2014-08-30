/**
 * Created by xun on 14-8-10.
 * 该类测试nodejs直接调用.bat文件运行
 */
/*
fs.writeFile('xcopy.bat', cmdstr, function (err) {
    if (err) throw err;
    var exec = require('child_process').exec;
    exec('call "'+process.cwd()+'/xcopy.bat',
        function (error, stdout, stderr) {
            if (error !== null) {
                //console.log('exec error: ' + error);
            }

        });
});
*/


test3();
function test3(){
    var cp = require('child_process');
    cp.execFile('E:\\nodejs\\website\\node_modules\\yxphantomjs\\run_phantomjs.bat',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            else{
                console.log('exec success ');
            }
        }
    );
}

//test2();
function test2(){
    require('child_process')
        .spawn('runas', ['/user:my_machine_name\\administrator', 'E:\\nodejs\\website\\node_modules\\yxspider\\lib\\spider\\units\\batTest.bat']);
}
//test();
function test(){
    var cp = require('child_process');
    cp.execFile('E:\\nodejs\\website\\node_modules\\yxspider\\lib\\spider\\units\\batTest.bat',
        //cp.execFile('E:\\nodejs\\website\\node_modules\\yxspider\\lib\\spider\\units\\test.js',
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
            }
            else{
                console.log('exec success ');
            }
        }
    );
}
//start();
function start(){
    console.log('Mother process is running.');
    //var ls = require('child_process').spawn('phantomjs', ['E:\\nodejs\\website\\node_modules\\yxspider\\lib\\spider\\units\\test.js']);
    var ls = require('child_process').spawn('runas', ['/user:my_machine_name\\administrator', 'E:\\nodejs\\website\\node_modules\\yxspider\\lib\\spider\\units\\test.js']);
    ls.stdout.on('data', function (data)
    {
        console.log('process close');
    });
    ls.stderr.on('data', function (data)
    {
        console.log(data.toString());
    });
    ls.on('exit', function (code)
    {
        console.log('child process exited with code ' + code);
        delete(ls);
        setTimeout(start,5000);
    });
}