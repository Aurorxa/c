# 第一章：共用体

## 1.1 概述

* 有的时候，需要一种数据结构，在不同的场合表示不同的数据类型，如：需要一种数据结构表示学生的成绩，有的时候是`整数`，如：80、90 等；有的时候是`字符`，如：'A'、'B' 等；有的时候是`浮点数`，如：80.5、60.5 等。
* C 语言提供了`共用体`（union，联合）结构类型，用来自定义可以灵活变更的数据类型。它内部可以包含各种属性，但是同一时间只能有一个属性，因为所有的属性都保存在同一个内存地址，后面写入的属性将会覆盖前面的属性。

> [!NOTE]
>
> * ① 之所以，C 语言会提供共用体，就是因为其可以节省内存。
> * ② 在实际开发中，共用体并不会使用很频繁；反而，结构体的使用更加频繁！！！
> * ③ 结构体占用的内存大于等于所有成员占用的内存的总和（成员之间可能会存在缝隙），共用体占用的内存等于最长的成员占用的内存。共用体使用了内存覆盖技术，同一时刻只能保存一个成员的值，如果对新的成员赋值，就会把原来成员的值覆盖掉。

## 1.2 声明共用体

* 语法：

```c
union 共用体名 {
    数据类型1 成员名1;   // 分号结尾
    数据类型2 成员名2;
    ……
    数据类型n 成员名n;
}
```



* 示例：

``` c {4-8}
#include <stdio.h>

// 声明公用体
union Data {
    int    s;  // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    return 0;
}
```

## 1.3 定义公用体变量

### 1.3.1 概述

* 定义了新的数据类型（公用体类型）以后，就可以定义该类型的变量，这与定义其他类型变量的写法是一样的。

### 1.3.2 方式一

* 语法：

```c
union 共用体类型名称 共用体变量名;
```

> [!NOTE]
>
> - ① 需要先定义共用体，然后再定义共用体变量。
> - ② `union` 关键字不能省略；否则， C 语言编译器将会报错。

> [!CAUTION]
>
> ::: details 点我查看 共用体和共用体变量的区别
>
> 在 C 语言中，共用体（union）和共用体变量是两个不同的概念，如下所示：
>
> - ① 共用体是一种自定义的数据类型，像一种模板，定义了数据的格式，不占用内存空间。
> - ② 共用体变量是根据共用体类型创建的变量，代表了一个具体的对象，用于存储数据，需要内存空间来存储。
>
> :::



* 示例：

```c {16}
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);
    
    // 定义共用体变量
    union Data data ;

    return 0;
}
```

### 1.3.3 方式二

* 语法：

```c
union 共用体名 {
    数据类型1 成员名1;   // 分号结尾
    数据类型2 成员名2;
    ……
    数据类型n 成员名n;
} 共用体变量1，共用体变量2,...;
```

> [!NOTE]
>
> 在声明共用体的同时定义共用体变量。



* 示例：

```c {8}
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
} data1,data2; // 定义共用体变量

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    return 0;
}
```

### 1.3.4 方式三

* 语法：

```c
union {
    数据类型1 成员名1;   // 分号结尾
    数据类型2 成员名2;
    ……
    数据类型n 成员名n;
} 共用体变量1，共用体变量2,...;
```

> [!NOTE]
>
> - ① 在声明共用体的同时定义共用体变量，但是不给共用体名，这种方式的结构体也称为`匿名共用体`。
> - ② 和`方式二`相比，后面的代码将无法通过该共用体来定义变量，因为没有共用体名称，除非使用 `typedef` 关键字。



* 示例：

```c {4,8}
#include <stdio.h>

// 声明公用体
union {
    int    s;   // 整数，如：80、90
    char   g;   // 字符，如：'A'、'B'
    double f;   // 浮点数，如：80.5、90.5
} data1, data2; // 定义共用体变量

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);


    return 0;
}
```

## 1.4 共用体变量中成员的获取和赋值

### 1.4.1 概述

* 成员是共用体的一个组成部分，一般是基本数据类型、也可以是数组、指针、结构体等。共用体的成员也可以称为属性。
* 共用体使用点号 `.` 获取单个成员，可以进行赋值和取值。

### 1.4.2 共用体成员赋值

* 语法：

```c
共用体变量名.成员名 = 值; // 值可以是常量或变量
```

> [!CAUTION]
>
> * ① 共用体使用了内存覆盖技术，同一时刻只能保存一个成员的值，如果对新的成员赋值，就会把原来成员的值覆盖掉。
> * ② 给共用体变量中的成员赋值的时候，尽量每次只给一个成员赋值，防止产生数据覆盖现象！！！

> [!NOTE]
>
> ::: details 点我查看 共用体和结构体的不同
>
> * ① 结构体的内存模型可能是这样的（不考虑内存对齐），如下所示：
>
> ![](./assets/1.gif)
>
> * ② 共用体的内存模型可能是这样的（不考虑内存对齐），如下所示：
>
> ![](./assets/2.gif)
>
> :::





* 示例：

```c {19}
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义共用体变量
    union Data data;

    // 赋值
    data.s = 80;
    printf("data.s = %d\n", data.s); // data.s = 80

    // 给其它成员赋值，会产生数据覆盖现象
    data.g = 'A';
    printf("data.s = %d\n", data.s); // data.s = 65

    return 0;
}
```

### 1.4.3 使用大括号给共用体中的某个成员赋值

* 示例：

```c
union 共用体类型 共用体变量 = {.}; // 只给首成员赋值
```

```c
union 共用体类型 共用体变量 = {.xxx = xxx}; // 给任一成员赋值
```



* 示例：

```c {16}
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义共用体变量并进行初始化
    union Data data = {80};

    printf("data.s = %d\n", data.s); // data.s = 80

    return 0;
}
```



* 示例：

```c
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义共用体变量并进行初始化
    union Data data = {.g = 'A'};

    printf("data.g = %c\n", data.g); // data.g = A

    return 0;
}
```

## 1.5 错误方式

* 不要向给结构体变量中成员一样，给超过 2 个以上的成员赋值，因为其底层的内存结构是不一样的。

> [!CAUTION]
>
> * ① 结构体占用的内存大于等于所有成员占用的内存的总和（成员之间可能会存在缝隙），共用体占用的内存等于最长的成员占用的内存。
> * ② 共用体使用了内存覆盖技术，同一时刻只能保存一个成员的值，如果对新的成员赋值，就会把原来成员的值覆盖掉。



* 示例：错误演示

```c
#include <stdio.h>

// 声明公用体
union Data {
    int    s; // 整数，如：80、90
    char   g; // 字符，如：'A'、'B'
    double f; // 浮点数，如：80.5、90.5
};

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义共用体变量并进行初始化
    // 错误方式，因为给超过 2 个以上的成员赋值
    union Data data = {.s = 80, .g = 'A', .f = 80.5}; // [!code error]

    return 0;
}
```

## 1.6 应用示例

* 需求：现有一张关于学生信息和教师信息的表格。

> [!NOTE]
>
> 表格信息，如下所示：
>
> | 姓名 | 编号 | 性别  | 职业 | 分数/ 课程 |
> | ---- | ---- | ----- | ---- | ---------- |
> | 张三 | 1001 | 男(m) | 学生(s) | 89.5       |
> | 李四 | 1101 | 男(m)  | 老师(t) | math       |
> | 王五 | 1002 | 女(f) | 学生(s) | English    |
> | 赵六 | 1102 | 男(m) | 老师(t) | 95.0       |



* 示例：

```c
#include <stdio.h>

struct Person {
    char name[20];
    int  id;
    char gender;     // 性别 m->男 f->女
    char profession; // 职业 s->学生 t->老师
    union {
        float score;
        char  course[20];
    } sc; // sc 是一个共用体变量
};

#define TOTAL 5
int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义共用体变量并进行初始化
    struct Person persons[TOTAL];

    printf("----------请输入学生和老师的信息-----------\n\n");
    
    // 输入人员信息
    for (int i = 0; i < TOTAL; i++) {
        printf("请输入姓名：");
        scanf("%s", persons[i].name);
        printf("请输入编号：");
        scanf("%d", &(persons[i].id));
        printf("请输入性别：");
        scanf(" %c", &(persons[i].gender));
        printf("请输入职业：");
        scanf(" %c", &(persons[i].profession));
        if (persons[i].profession == 's') { // 如果是学生
            printf("请输入学生成绩：");
            scanf("%f", &persons[i].sc.score);
        } else { // 如果是老师
            printf("请输入老师课程：");
            scanf("%s", persons[i].sc.course);
        }
        printf("\n");
    }

    printf("----------学生和老师的信息，如下所示：-----------\n\n");

    // 输出人员信息
    for (int i = 0; i < TOTAL; i++) {
        printf("姓名：%s ", persons[i].name);
        printf("编号：%d ", persons[i].id);
        printf("性别：%c ", persons[i].gender);
        printf("职业：%c ", persons[i].profession);
        if (persons[i].profession == 's') { // 如果是学生
            printf("成绩：%f ", persons[i].sc.score);
        } else { // 如果是老师
            printf("课程：%s ", persons[i].sc.course);
        }

        printf("\n");
    }

    return 0;
}
```



# 第二章：typedef（⭐）

## 2.1 概述

* 之前，我们在使用结构体或共用体的时候，经常会这么写，如下所示：

```c {15,25-28}
#include <stdio.h>

/**
 * 声明结构体
 */
struct Person {
    char name[20];
    int  id;
};

/**
 * 打印结构体成员中的属性
 * @param person
 */
void toString(struct Person person) {
    printf("编号：%d ，姓名：%s \n", person.id, person.name);
}

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义结构体变量并进行初始化
    struct Person p1 = {.id = 1001, .name = "张三"};
    struct Person p2 = {.id = 1002, .name = "李四"};
    struct Person p3 = {.id = 1003, .name = "王五"};
    struct Person p4 = {.id = 1004, .name = "赵六"};

    // 输出结构体成员中的属性
    toString(p1);
    toString(p2);
    toString(p3);
    toString(p4);

    return 0;
}
```

> [!NOTE]
>
> * ① 在声明结构体类型的时候，使用 struct 关键字很好理解。
> * ② 但是，在使用结构体变量给其成员赋值的时候，还要携带 `struct` 关键字就显得多余，但是不携带编译器又会报错，因为编译器不识别 `Person` 到底是什么，只会认为是一个字符串，而不是数据类型。
> * ③ 如果对比 Java 语言，你会发现 Java 语言的`强类型系统`是多么优秀。
>
> ::: details 点我查看 Java 语言的强类型系统
>
> ```java 
> class Person {
>    int id;
>    String name; 
> }
> 
> class Test {
>     public static void main(String[] args){
>         // Java 编译器可以直接认为 Person 就是一个数据类型
>         // 而不需要我们写 class Person p = new Person();
>         Person p = new Person(); // [!code highlight]
>         p.id = 1000;
>         p.name = "张三";
>     }
> }
> ```
>
> :::

* C 语言提供了 typedef 关键字可以让我们给类型起别名（重命名），如下所示：

```c
typedef 旧名 新名（别名）;
```

> [!NOTE]
>
> * ① `typedef` 不创建新类型，只是为现有类型提供了一个别名。
> * ② 主要用途是简化复杂的类型声明，增强代码可读性。

* 那么，我们就可以将上面的代码简化下，如下所示：

```c {15,25-28}
#include <stdio.h>

/**
 * 声明结构体
 */
typedef struct Person { // [!code highlight]
    char name[20];
    int  id;
} Person; // [!code highlight]

/**
 * 打印结构体成员中的属性
 * @param person
 */
void toString(Person person) {
    printf("编号：%d ，姓名：%s \n", person.id, person.name);
}

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义结构体变量并进行初始化
    Person p1 = {.id = 1001, .name = "张三"};
    Person p2 = {.id = 1002, .name = "李四"};
    Person p3 = {.id = 1003, .name = "王五"};
    Person p4 = {.id = 1004, .name = "赵六"};

    // 输出结构体成员中的属性
    toString(p1);
    toString(p2);
    toString(p3);
    toString(p4);

    return 0;
}
```

## 2.2 使用方式

### 2.2.1 概述

* 使用 typedef 可以给`基本数据类型`、`结构体类型`、`共用体类型`、`指针类型`起别名。

> [!IMPORTANT]
>
> 在实际开发中，使用 typedef 为`结构体类型`起`别名`居多！！！

### 2.2.2 给基本数据类型起别名

* 语法：

```c
typedef 类型名 别名;
```

> [!NOTE]
>
> * ① 在实际开发中，我们经常将 typedef 声明的类型名的第 1 个字母用大写表示，如：`Integer`。
> * ② 在系统提供的标准类型别名的标识符，通常使用下划线的命名风格，如：`size_t` 。





* 示例：

```c
#include <stdio.h>
// 将 Integer 作为 int 的别名
typedef int Integer; // [!code highlight]

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义变量，并使用类型别名
    Integer a = 20; // [!code highlight]
    int     b = 30;

    printf("%d + %d = %d\n", a, b, a + b);

    return 0;
}
```



* 示例：

```c
#include <stdio.h>
// 将 Integer 作为 int 的别名
typedef int Integer; // [!code highlight]

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义变量，并使用类型别名
    Integer a, b; // [!code highlight]

    a = 20;
    b = 30;

    printf("%d + %d = %d\n", a, b, a + b);

    return 0;
}
```



* 示例：

```c
#include <stdio.h>
// 将 Byte 作为 unsigned char 的别名
typedef unsigned char Byte; // [!code highlight]

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义变量，并使用类型别名
    Byte c = 'a'; // [!code highlight]

    printf("%c\n", c);

    return 0;
}
```

### 2.2.3 为结构体类型、共用体类型起别名

* 语法：

```c
typedef struct 结构体名 {
    ...
} 别名;
```

```c
typedef union 共用体名 {
    ...
} 别名;
```

> [!NOTE]
>
> ::: details 点我查看 匿名结构体和匿名公用体
>
> 在 C 语言中，结构体名和共用体名都可以省略，所以 typedef 为结构体类型和共用体类型起别名，又可以这样：
>
> ```c
> typedef struct { // 匿名结构体
>  ...
> } 别名;
> ```
>
> ```c
> typedef union { // 匿名共用体
>  ...
> } 别名;
> ```
> :::



* 示例：

```c
#include <stdio.h>

/**
 * 声明结构体
 */
typedef struct {
    char name[20];
    int  id;
} Person; // [!code highlight]

/**
 * 打印结构体成员中的属性
 * @param person
 */
void toString(Person person) { // [!code highlight]
    printf("编号：%d ，姓名：%s \n", person.id, person.name);
}

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    // 定义结构体变量并进行初始化
    Person p1 = {.id = 1001, .name = "张三"}; // [!code highlight]
    Person p2 = {.id = 1002, .name = "李四"}; // [!code highlight]
    Person p3 = {.id = 1003, .name = "王五"}; // [!code highlight]
    Person p4 = {.id = 1004, .name = "赵六"}; // [!code highlight]

    // 输出结构体成员中的属性
    toString(p1);
    toString(p2);
    toString(p3);
    toString(p4);

    return 0;
}
```

### 2.2.4 为指针类型起别名

* 语法：

```c
typedef 指针类型 别名;
```



* 示例：

```c
#include <stdio.h>

// 为指针类型起别名
typedef int* P_INT; // [!code highlight]

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    int arr[] = {1, 2, 3, 4, 5};

    // 使用指针变量 p 指向数组 arr
    P_INT p = arr; // [!code highlight]

    for (int i = 0; i < 5; i++) {
        printf("%d ", *(p + i));
    }

    return 0;
}
```



* 示例：

```c
#include <stdio.h>

// 为指针类型起别名
typedef int (*P_INT)(int, int); // [!code highlight]

/**
 * 求和函数
 */
int add(int a, int b) {
    return a + b;
}

int main() {

    // 禁用 stdout 缓冲区
    setbuf(stdout, nullptr);

    P_INT p = add; // [!code highlight]
    printf("%d\n", (*p)(1, 2));

    return 0;
}
```

## 2.3 typedef 和 #define 的区别

* `#define` 是在`预处理阶段`处理 的，它只能作简单的字符串替换。
* `typedef` 是在`编译阶段`处理 的，且并非简单的字符串替换。

## 2.4 为什么要给类型定义别名？

### 2.4.1 概述

* ① 提升代码的可读性：原类型名往往是一个通用的称呼，而别名是此场景下的一个精准描述。
* ② 提升代码的扩展性：这一点在数据结构中会体现的很明显。
* ③ 提升代码的跨平台性移植性：类型别名的语法最重要的用途就是增强代码的跨平台移植性。

### 2.4.2 类型别名如何提升跨平台性移植性？

* 我们都知道，C 语言由于编译器、平台之间的差异，经常会出现同一个类型，但存储方式不同的情况，比如：
  * int 类型在绝大多数现代桌面平台下，占用 4 个字节 32 位内存空间。大多数应用级 C 程序员接触的 int 类型，也是 4 个字节的 int 类型。
  * 但是在某些小型机器或者嵌入式平台下，int 类型可能就会变成占用 2 个字节 16 位内存空间的整数类型。（因为要节省内存空间）

* 于是代码在跨平台移植时，就会出现以下问题：

```c
int num = 100000;
```

> [!NOTE]
>
> * ① 上述的代码在 int 类型是 4 个字节的内存空间下是没有什么问题的。
> * ② 但是，如果 int 类型是 2 个字节的内存空间，就会出现数据溢出现象，将会出现数据精度丢失甚至数据错误的！！！

* 那么，如何避免这种情况？

> [!NOTE]
>
> * 方案 ①：直接将 num 的类型变更为更大的数据类型，如：long 等，在进行程序移植的时候，就避免了数据溢出现象。
> * 方案 ②：为每个平台选择合适的类型：原平台继续使用 int ，而新的平台使用更大的类型 long 。

* 对于 Java 语言，其是应用级的编程语言，追求的是程序的可移植性，就选择了方案 ① 。但是，对于 C 语言而言，其是系统级的编程语言，追求的是效率，为了不造成内存浪费，就选择了方案 ② 。

> [!NOTE]
>
> * ① 我们在原平台，将 int 类型定义为别名 BigInteger ，如：`typedef int BigInteger`。
> * ② 我们在新的平台，将 long 类型定义为别名 BigInteger，如：`typedef long BitInteger`。
> * ③ 这样，我们在所有的平台都使用 BitInteger 来存储整数，就可以解决跨平台程序移植的问题。
> * ④ 其实，C 语言规范的实现者，也为我们想到了这种问题的解决方案，其提供了`精确宽度类型`就是为了解决 C 程序中整数类型跨平台移植的问题。
>
> ::: details 点我查看 精确宽度类型
>
> | 类型名称 | 含义            |
> | :------- | :-------------- |
> | int8_t   | 8 位有符号整数  |
> | int16_t  | 16 位有符号整数 |
> | int32_t  | 32 位有符号整数 |
> | int64_t  | 64 位有符号整数 |
> | uint8_t  | 8 位无符号整数  |
> | uint16_t | 16 位无符号整数 |
> | uint32_t | 32 位无符号整数 |
> | uint64_t | 64 位无符号整数 |
> :::

