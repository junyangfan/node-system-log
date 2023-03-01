#!/bin/bash

ReservedNum=30                      #保留文件数量
rm_file_dir=$1  #需要删除文件的路径
cd $rm_file_dir    #进入文件夹
RootDir=$(cd $(dirname $0); pwd)      #当前文件路径
FileNum=$(ls -l | grep ^- | wc -l)    #查找文件数量
OldFile=$(ls -rt *.txt|head -1)         #找出txt最早文件
if [ $RootDir == $rm_file_dir ];then   #判断所在目录是否正确
	echo $RootDir
	echo $rm_file_dir
	while (($FileNum>$ReservedNum))  #文件数超过设置变量才执行
	do
	echo "Delete File:"$RootDir'/'$OldFile   #打印要删除的文件名称
	rm -f $RootDir'/'$OldFile                       #删除文件
	let "FileNum--"                                      #变量自减操作
	OldFile=$(ls -rt *.txt|head -1)         #更新txt最早文件
	done
else
	echo "error file path "                         #所在目录不对打印出路径错误
fi
