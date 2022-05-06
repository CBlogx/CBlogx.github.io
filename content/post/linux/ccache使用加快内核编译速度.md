---
title: "Ccache使用加快内核编译速度"
date: 2022-05-07T00:28:11+08:00
draft: false
tag: ["Linux"]
categories: ["Linux"]
description: ccache能够有效的提高Linux内核编译的速度
---

1. 首先 sudo apt-get install ccache 进行安装

2. 使用 vim ~/.bashrc 或者 gedit ~/.bashrc 打开 bashrc 配置文件即可

3. 将下列代码块复制到 bashrc 文件的末尾(注意这 CCACHE_DIR 中的 ubuntu 指的是你的当前系统用户名)

```bash
  export USE_CCACHE=1
  export CCACHE_DIR="/home/ubuntu/.ccache"
  export CC="ccache gcc"
  export CXX="ccache g++"
  export PATH="$PATH:/usr/lib/ccache"
```

4. 使用 source ~/.bashrc 使配置生效

5. 检查，使用 which g++，若输出的为/usr/lib/ccache 则成功

> 注意:
>
> - 内核态和用户态下的 ccache 并不相通
> - 用户态下看到的是/usr/lib/ccache/g++
> - 内核态下看到的是/usr/bin/g++（我的系统是这样显示的）

6.  使用 ccache -M 50G 来调整一下 ccache 的大小（50G 是根据自己需求大小来调整的）

7.  使用方法：
    编译普通 c 文件：输入 ccache gcc xxx（gcc xxx 为正常 gcc 编译命令）
    编译内核: 切换到 root，进入到你的 Linux 源码包
    使用 make 语句时加上 CC='ccache gcc'
    即 make CC='ccache gcc'
    （末尾可以加上 -j4 以更快的速度编译，前提 cpu 为四核）

8.  ccache 实际上是利用了缓存机制来加速内核的编译，
    将编译过程中使用到 gcc/g++编译的部分保存下来，
    再次编译时则会跳过已编译且无更改的部分。

9.  初次使用时编译时间还没有改变，
    但是以后再编译时时间就会快很多
    （若更改了虚拟机的配置，可能会要重新配置 ccache）
    亲测内核编译从原本的 55 分钟变为了 15 分钟，爽啊！

10. 当然使用 ccache 也是会有缺点的，不过对正常使用的影响一般来说并不算
    大， 使用 ccache 之后能看到内存和磁盘的使用率会有显著的提高，对于内存偏小的
    朋友需要谨慎使用 ccache，否则可能会造成物理机无法正常使用。
