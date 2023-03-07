---
title: "求root(N,k)"
date: 2023-03-07T16:31:37+08:00
draft: false
tags: ["algorithm", "C++"]
categories: ["algorithm"]
---

> 描述:  
> N<k 时，root(N,k) = N，否则，root(N,k) = root(N',k)。N'为 N 的 k 进制表示的各位数字之和。
> 输入 x,y,k，输出 root(x^y,k)的值 (这里^为乘方，不是异或)，2=<k<=16，0<x,y<2000000000，有一半的测试点里 x^y 会溢出 int 的范围(>=2000000000)  
> 输入描述：
> 每组测试数据包括一行，x(0<x<2000000000), y(0<y<2000000000), k(2<=k<=16)  
> 输出描述：
> 输入可能有多组数据，对于每一组数据，root(x^y, k)的值  
> 示例  
> 输入：  
> 4 4 10  
> 输出：  
> 4
>
> 解析：  
> 依题意可知,N'为 N 的 k 进制表示的各个位数之和。  
> 首先用 k 进制来表示$N=a_0+a_1k+a_2k^2+...+a_nk^n$，那么$N'=a_0+a_1+a_2+...+a_n$  
> 于是就有$N-N'=a_1(k-1)+a_2(k^2-1)+...+a_n(k^n-1)$，由于$k-1,..,k^n-1$都包含$k-1$因子  
> 故$(N-N')$ % $(k-1)=0$  
> 于是可以如下推导：  
> $(N'-N'')$ % $(k-1)=0$  
> $(N^{(i-1)}-N^{(i)})$ % $(k-1)=0$  
> 由此可得前 $i$ 项和为 $(N-N^{(i)})$ % $(k-1)=0$  
> 移项后得到$N^{(i)}=N$ % $(k-1)$  
> 依题意要求，即$N^{(i)}=x^y$%$(k-1)$

```c++
#include <iostream>

using namespace std;

int root(int x, int y, int k)
{
    int res = 1, tmp_x = x % k, tmp_y = y;
    // 快速幂
    while (tmp_y != 0)
    {
        if (tmp_y % 2 == 1)
        {
            res *= tmp_x;
            res %= k;
        }
        tmp_y /= 2;
        tmp_x = (tmp_x * tmp_x) % k;
    }
    // 如果N%(k-1)==0，则说明最后一个小于k的数是k-1
    // x!=0代表传入的x值不为0
    if (x != 0 && res % k == 0)
        return k;
    return res % k;
}

int main()
{
    int x, y, k;
    while (cin >> x >> y >> k)
    {
        cout << root(x, y, k - 1) << endl;
    }
    return 0;
}
```
