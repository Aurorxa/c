# 第一章：回顾知识

## 1.1 虚拟地址空间

* 为了更好的管理程序，操作系统将虚拟地址空间分为了不同的内存区域，这些内存区域存放的数据、用途、特点等皆有不同，下面是 Linux 下 32 位环境的经典内存模型，如下所示：

![](./assets/1.svg)

- 每个内存区域的特点，如下所示：

| 内存分区                  | 说明                                                         |
| :------------------------ | :----------------------------------------------------------- |
| 程序代码区（code）        | 存储程序的执行代码，通常为只读区，包含程序的指令。 程序启动时，这部分内存被加载到内存中，并不会在程序执行期间改变。 |
| 常量区（constant）        | 存放程序中定义的常量值，通常也是只读的，这些常量在程序运行期间不可修改。 |
| 全局数据区（global data） | 存储程序中定义的全局变量和静态变量。 这些变量在程序的整个生命周期内存在，且可以被修改。 |
| `堆区（heap，⭐）`         | 用于动态分配内存，例如：通过 `malloc` 或 `new` 分配的内存块。 堆区的内存由程序员手动管理，负责分配和释放。 如果程序员不释放，程序运行结束时由操作系统回收。 |
| 动态链接库                | 动态链接库（如： `.dll` 或 `.so` 文件）被加载到内存中特定的区域，供程序运行时使用。 |
| 栈区（stack）             | 用于存储函数调用的局部变量、函数参数和返回地址。 栈是自动管理的，随着函数的调用和返回，栈上的内存会自动分配和释放。 |

> [!NOTE]
>
> - ① 程序代码区、常量区、全局数据区在程序加载到内存后就分配好了，并且在程序运行期间一直存在，不能销毁也不能增加（大小已被固定），只能等到程序运行结束后由操作系统收回，所以全局变量、字符串常量等在程序的任何地方都能访问，因为它们的内存一直都在。
> - ② 函数被调用时，会将参数、局部变量、返回地址等与函数相关的信息压入栈中，函数执行结束后，这些信息都将被销毁。所以局部变量、参数只在当前函数中有效，不能传递到函数外部，因为它们的内存不在了。
> - ③ 常量区、全局数据区、栈上的内存由系统自动分配和释放，不能由程序员控制。`程序员唯一能控制的内存区域就是堆`（Heap）：它是一块巨大的内存空间，常常占据整个虚拟空间的绝大部分，在这片空间中，程序可以申请一块内存，并自由地使用（放入任何数据）。堆内存在程序主动释放之前会一直存在，不随函数的结束而失效。在函数内部产生的数据只要放到堆中，就可以在函数外部使用。

* 在 64 位 Linux 环境下，虚拟地址空间大小为 256TB，Linux 将高 128TB 的空间分配给内核使用，而将低 128TB 的空间分配给用户程序使用，如下所示：

![](./assets/2.svg)

> [!NOTE]
>
> - ① `程序代码区`，也可以称为`代码段`；而`全局数据区`和`常量区`，也可以称为`数据段`。
> - ② `全局数据区`分为`初始化数据段`（存储已初始化的全局变量和静态变量）和`未初始化数据段`（存储未初始化的全局变量和静态变量）；`常量区`也称为`只读数据段`，通常是只读的，防止数据被修改。
> - ③ 冯·诺依曼体系结构中的`程序`，也被称为`存储式程序`，需要通过加载器（Loader），将程序从硬盘加载到内存中运行。
> - ④ `存储式程序`中的`程序`分为`指令`和`数据`；其中，`代码段`中保存的是`指令`，`数据段`中保存的是`数据`。

## 1.2 栈区的内存管理、特点、优缺点和应用场景

### 1.2.1 栈内的内存管理

* `栈区`（Stack）的内存管理主要依赖`栈指针寄存器（Stack Pointer 寄存器，简称：SP 寄存器）`的移动来实现。
* 我们可以简单的将 SP 寄存器看成是一个跟踪`栈顶位置`的指针，它始终指向栈的顶部。
* 栈区可以随着函数的调用生长，而且是从高地址向低地址，向下生长，即：
  * ① 当函数开始调用，栈帧进栈的时候，SP 会减少，栈顶移向低地址。
  * ② 当函数结束调用，栈帧出栈的时候，SP 会增加，栈顶移向高地址。
* 假设函数调用的代码，如下所示：

```c
#include <stdio.h>

void test(){
    
    printf("我是 test 函数");
    
}

int main(){
    
    test(); // [!code highlight]
    
    printf("我是 main 函数")
    
    return 0;
}
```

* 当 `test` 函数开始调用，即：test 栈帧进栈的时候，其对应的内存示意图，如下所示：

![](./assets/3.svg)

* 当 `test` 函数结束调用，即：test 栈帧出栈的时候，其对应的内存示意图，如下所示：

![](./assets/4.svg)

### 1.2.2 栈区的特点及其优缺点

* ① 栈区的特点：

| 特点                         | 说明                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| `存取速度快`                 | 栈是一块连续的内存区域，且管理方式简单（仅需要调整栈指针），因此栈区的内存分配和访问速度极快。 |
| `自动管理`                   | 操作系统负责栈区内存的分配与释放，程序员无需显式操作。<br>避免了内存泄漏等问题，但同时缺乏灵活性。 |
| `空间有限`                   | 栈的大小通常是固定的（由操作系统或编译器设定），因此栈区的内存较为有限，适合存储小型对象或短期变量。<br/>若栈空间耗尽（递归过深），可能导致`栈溢出（Stack Overflow）`。 |
| `短生命周期（自动存储期限）` | 栈区的内存用于局部变量和临时数据，生命周期短，当函数执行完毕后，栈帧随即释放。<br/>栈区的变量通常仅在函数作用域内有效。 |
| `线程私有`                   | 每个线程都有自己独立的栈空间，不会被其他线程访问，即：线程安全。 |
| `地址从高向低分配`           | 栈通常是从高地址向低地址增长的（取决于具体的硬件架构）。     |

* ② 栈区的优点：

| 优点   | 说明                                                 |
| ------ | ---------------------------------------------------- |
| `高效` | 由于操作系统自动管理栈，分配和释放的效率很高。       |
| `安全` | 程序员不需要显式释放内存，避免了悬空指针和内存泄漏。 |

* ③ 栈区的缺点：

| 缺点         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `空间受限`   | 栈的大小固定，无法动态扩展，容易发生栈溢出。                 |
| `生命周期短` | 只能用于短期数据的存储，不适合存储大数据或需要长时间保存的数据。。 |

### 1.2.3 应用场景

* 由于栈区的优点，即：栈区`适合`存储短生命周期的小型数据，如下所示：
  * ① 局部变量。
  * ② 函数参数。
  * ③ 返回地址。
  * ④ 临时变量。
  * ...

* 由于栈区的缺点，即：栈区`不适合`存储需要动态分配、生命周期较长或跨函数调用的数据结构，如下所示：
  * ① 存储体积较大的数据结构，如：大数组、长字符串和大型结构体。
  * ② 动态数据结构，如：动态长度的数组，链表，树等。
  * ③ 多线程共享的数据。
  * ④ 需要作为函数返回值的数据结构的指针（返回栈区数据的指针会引发悬空指针问题）。
  * ...

## 1.3 堆区的内存管理、特点、优缺点和应用场景

### 1.3.1 堆区的内存管理

* `堆区`（Heap）是计算机内存中的一部分，用于动态分配内存。与栈区不同，堆区的内存管理由程序员控制，通常用于存储程序运行时动态生成的数据。

> [!NOTE]
>
> ::: details 点我查看 堆区内存管理的具体方面
>
> * ① **动态内存分配**：
>   * 在程序执行过程中，可以根据需求动态分配内存。
>   * 在 C/C++ 中，使用 `malloc`、`calloc`、`realloc` 等函数来分配堆内存，使用 `free` 来释放内存。
>   * 在 Java 或其他现代语言中，堆内存由垃圾回收机制（GC）自动管理，但仍然是动态分配的。
>
> * ② **内存管理方式**：
>   * 在 C/C++ 中，对于堆区的内存管理是`手动管理`，即：程序员需要显式分配和释放堆内存，若忘记释放，会造成内存泄漏；释放后指针仍然指向已释放的内存会导致悬挂指针等问题。
>   * 在 Java、C# 中，对于堆区的内存管理是`自动管理`，即：堆内存由垃圾回收机制（GC）自动管理，程序员不需要手动释放内存，但也要小心避免内存泄漏（对象仍被引用但不再使用）。
> * ③ **内存分配和释放过程**：
>   * 内存分配时，堆区会找到一个足够大的空闲区域并返回内存地址，分配的内存没有固定的顺序或结构，可能导致内存碎片。
>   * 堆内存释放时，操作系统会将已释放的内存标记为可用，但并不立即回收，直到下一次分配时才会重新利用。
>
> :::

### 1.3.2 堆区的特点及其优缺点

* ① 堆区的特点：

| 特点                     | 说明                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `灵活的内存分配与释放`   | 堆内存由程序员显式管理，内存的大小和生命周期不固定，可以根据需要动态调整。<br/>适用于存储需要长时间存在的对象，或者其大小在编译时无法确定的数据结构，如：动态数组、链表、树等。 |
| `内存碎片化`             | 堆区内存管理采用的是一种"自由存储"方式（free store），会出现内存碎片。<br>内存碎片可以通过优化内存分配算法（`内存池`）或使用垃圾回收机制来减轻，但无法完全避免。 |
| `程序员控制`             | 堆内存的分配和释放通常是由程序员来手动控制（在低级语言，如： C/C++ 中），这带来灵活性但也增加了出错的可能性（忘记释放内存导致内存泄漏）。<br/>现代语言，如：Java 和 Python ，使用自动垃圾回收机制来减少手动管理内存的麻烦，但堆内存的生命周期和分配仍然是动态的。。 |
| `跨函数调用生命周期`     | 堆区内存的生命周期由程序员控制，可以在多个函数或作用域之间共享。<br/>可以通过指针或引用将堆内存分配的对象传递给不同的函数。 |
| `相对较慢的内存访问速度` | 由于堆区内存需要动态分配，且可能涉及到较为复杂的内存管理策略，因此其访问速度通常不如栈区内存。<br/>与栈区的内存访问不同，堆区可能存在更多的内存寻址和管理开销。 |
| `线程共享`               | 堆区内存是线程共享的，这意味着多个线程可以访问堆上的数据。<br/>使用堆内存时需要注意线程安全问题，需要使用互斥锁（mutexes）等同步机制来防止多个线程同时访问同一块堆内存而导致竞争条件。 |

* ② 堆区的优点：

| 优点             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| `灵活性高`       | 可以动态分配和释放内存，适用于未知大小或生命周期较长的数据。 |
| `跨函数调用共享` | 堆上的数据可以在不同函数间共享，适用于全局性、长期有效的对象。 |
| `适合大数据结构` | 动态数组、链表、树、图等大数据结构通常存放在堆区。           |

* ③ 堆区的缺点：

| 缺点         | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| `管理复杂`   | 需要程序员手动管理内存（在 C/C++ 中），容易造成内存泄漏或悬空指针。 |
| `内存碎片化` | 频繁的分配与释放会导致堆内存碎片化，影响效率。               |
| `性能较差`   | 内存分配和访问速度相对较慢。                                 |

### 1.3.3 应用场景

* 由于堆区的优点，即：堆区`适合`存储需要动态分配、生命周期较长或跨函数调用的数据结构，如下所示：
  * ① 存储体积较大的数据结构，如：大数组、长字符串和大型结构体。
  * ② 动态数据结构，如：动态长度的数组，链表，树等。
  * ③ 多线程共享的数据。
  * ④ 需要作为函数返回值的数据结构的指针（返回栈区数据的指针会引发悬空指针问题）。
  * ...
* 由于堆区的缺点，即：堆区`不适合`存储短生命周期的小型数据，如下所示：
  - ① 局部变量。
  - ② 函数参数。
  - ③ 返回地址。
  - ④ 临时变量。
  - ...

> [!CAUTION]
>
> * ① 尽管堆区提供了灵活的内存管理方式，但也需要程序员小心处理内存分配与释放，防止内存泄漏和碎片化等问题。
> * ② 在现代编程语言中，垃圾回收机制可以减轻程序员的内存管理负担，但对堆内存的操作仍然比栈区更复杂且开销较大。
> * ③ 彼之蜜饯，吾之砒霜：合理地结合栈和堆的使用，我们能够设计出既高效又灵活的应用程序。在这个过程中，理解每种内存区域的特性及其最佳应用场景是至关重要的。



# 第二章：C 语言中的动态内存分配（⭐）

## 2.1 概述





## 2.2 CLion 整合 Valgrind（必做）

* C 语言中的指针是否使用是个颇具争议的话题，现代化的高级编程语言通过各种策略和机制，在编译期就能解决指针危险的问题。但是，遗憾的是，C 语言的指针很大程度上，在运行期才会暴露问题。
* 幸运的是，我们可以使用 `Valgrind` 项目来进行`内存泄漏检测`，而 `Valgrind` 只支持 Linux 。

> [!NOTE]
>
> :::details 点我查看
>
> [CLion 整合 Valgrind](/02_c-leap/04_xdx/#_4-1-内存泄漏检测)
>
> :::

## 2.3 通用指针类型











# 第三章：手动实现 C++ 的 Vector



`malloc` 是 C 语言中用于动态分配内存的函数，所分配的内存不会随着程序结束而自动释放，除非操作系统负责回收。这意味着，在程序运行期间，使用 `malloc` 分配的内存如果不手动释放（即使用 `free()` 函数释放），程序本身并不会自动回收这些内存。

### 具体情况如下：

1. **程序运行期间：**  
   在程序运行过程中，使用 `malloc` 分配的内存必须由程序显式地调用 `free()` 来释放。如果不这样做，就会造成**内存泄漏**，即这些内存永远不会再被程序使用，直到程序结束。

2. **程序结束后：**  
   当程序完全结束后，操作系统通常会收回该程序所占用的所有资源，包括 `malloc` 分配的内存。因此，程序终止后，尽管没有调用 `free()`，操作系统仍然会回收这些动态分配的内存。

3. **为什么还是要手动释放？**  
   尽管程序终止后内存会被操作系统回收，但如果你的程序是一个长时间运行的应用（如服务器、后台服务），持续的内存泄漏将会导致内存的不可用部分不断增多，最终导致系统内存耗尽。因此，为了保证程序的健壮性和高效性，在程序运行中及时手动释放内存是非常重要的。

### 例子：

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr = (int *)malloc(10 * sizeof(int));  // 动态分配内存

    if (ptr == NULL) {
        printf("内存分配失败\n");
        return 1;
    }

    // 使用分配的内存
    for (int i = 0; i < 10; i++) {
        ptr[i] = i;
        printf("%d ", ptr[i]);
    }
    printf("\n");

    free(ptr);  // 手动释放内存

    return 0;
}
```

在这个例子中，`malloc` 分配了 10 个整数的内存，并在最后通过 `free()` 释放了这部分内存。如果没有调用 `free()`，那么在程序运行期间这部分内存将无法被重新使用，导致内存泄漏，但程序终止后，操作系统还是会回收它。

总结来说，尽管操作系统会在程序结束时回收内存，但在程序运行过程中，我们仍然需要显式地释放通过 `malloc` 分配的内存以防止内存泄漏。


是的，尽管操作系统会在程序终止时回收程序所占用的内存资源，**仍然建议手动释放通过 `malloc` 分配的内存**。有几个原因：

1. **良好的编程习惯**：及时释放动态分配的内存有助于养成良好的编程习惯。内存泄漏虽然在程序终止时会被操作系统回收，但在长时间运行的程序或嵌入式系统中，内存泄漏会逐渐耗尽可用内存，导致程序运行效率低下，甚至崩溃。

2. **动态库和插件环境**：如果你编写的是动态库或插件，这些代码可能在应用程序的生命周期内被多次加载和卸载。如果不手动释放内存，内存泄漏可能累积，导致更严重的问题。

3. **避免误用或未及时释放**：即使操作系统会回收内存，如果程序运行中频繁分配而不释放内存，可能会导致内存使用量过大，甚至超出系统资源，特别是在长时间运行的服务或应用中。这会使程序在运行过程中性能下降或出现异常。

4. **跨平台行为差异**：虽然大多数现代操作系统会在程序退出时自动回收内存，但在某些嵌入式系统或资源有限的环境中，可能不会有这样的机制。因此，手动释放内存是一种更为安全的选择。

总结来说，尽管操作系统最终会释放程序终止时的内存，手动释放动态分配的内存仍然是一个良好的编程实践，能够提高代码的健壮性和可维护性。


在 C 语言中，使用 `malloc` 动态分配内存后，需要使用 `free` 来释放内存，主要原因有以下几点：

### 1. **避免内存泄漏**
当使用 `malloc` 动态分配内存时，系统为程序分配了一块指定大小的内存，而这块内存不会在使用完毕后自动释放。只有通过调用 `free` 函数，操作系统才能将这块内存标记为可重新使用。如果不调用 `free`，内存将一直被程序占用，直到程序结束，这会导致**内存泄漏**。

内存泄漏的危害在于：
- **耗尽系统内存**：程序长期运行而不释放内存会逐渐消耗系统内存资源，最终可能导致系统或程序崩溃。
- **性能下降**：随着内存泄漏积累，系统内存资源减少，导致程序运行速度变慢或出现资源不足问题。

### 2. **提高程序的内存管理效率**
手动管理内存允许程序员根据需要灵活地分配和释放内存资源。通过及时释放不再使用的内存，可以有效地提高程序的内存利用效率，使系统能够将这些内存重新分配给其他任务。这对于长期运行的程序，尤其是服务器或后台进程，尤为重要。

### 3. **避免程序异常行为**
如果不及时释放内存，不仅会导致内存泄漏，还可能导致程序出现意外行为，例如：
- **内存碎片化**：当分配和释放内存的顺序不一致时，内存会变得零碎化，剩余的内存虽然总量足够，但可能无法满足某次较大的分配请求，从而导致分配失败。
- **内存访问问题**：未释放的内存在后续程序运行中可能仍被访问，如果程序继续使用这块已过期的内存，可能会出现不可预知的错误或崩溃。

### 4. **符合动态内存分配的对称性原则**
`malloc` 和 `free` 是一对相互配合的函数。`malloc` 用于申请内存，而 `free` 则用于归还这块内存。这种对称性使得内存管理变得可控和可维护，符合编程中资源管理的基本原则：**谁申请资源，谁负责释放资源**。

### 5. **防止其他潜在的内存管理问题**
- **悬空指针（Dangling Pointer）**：如果没有正确使用 `free` 释放内存，并继续使用释放前的指针，可能会导致悬空指针问题。调用 `free` 后通常也应将指针置为 `NULL`，以避免无效的指针引用。
  
- **内存重用问题**：在不释放内存的情况下重新分配内存，可能导致内存重叠或不可预期的行为。

### 总结
通过 `free` 释放动态分配的内存，可以避免内存泄漏、提高内存管理效率、减少异常行为以及确保程序的健壮性。总的来说，良好的内存管理实践要求在使用 `malloc` 分配内存后，在合适的时机释放这些内存，以保证程序的稳定性和高效性。







在 C 语言中，`free(p)` 是用来释放动态内存的函数，由 `malloc`、`calloc` 或 `realloc` 分配的内存通过 `free` 来归还给系统。然而，`free(p)` 不能被调用两次或两次以上，因为这样可能导致 **未定义行为（Undefined Behavior）**。以下是具体的原因：

---

### 1. **释放后指针成为悬空指针（Dangling Pointer）**
- 当调用 `free(p)` 时，指针 `p` 所指向的内存被归还给操作系统。
- 此时，`p` 本身的值并不会被置为 NULL（除非你显式地将其设置为 `p = NULL`）。
- 如果再次调用 `free(p)`，此时 `p` 指向的内存实际上已经被释放，而 `free` 函数试图再次释放这块已经被归还的内存，这会导致程序行为不可预测。

---

### 2. **内存管理数据结构被破坏**
- 内存分配器（通常是运行时库的一部分）需要维护某种数据结构来记录哪些内存块是分配的，哪些是空闲的。
- 调用 `free(p)` 时，这些数据结构会更新以标记相应的内存块为“空闲”。
- 如果同一个内存块被释放多次，内存分配器可能会尝试多次更新这些数据结构，最终可能导致数据结构损坏，引发程序崩溃或更严重的问题（比如错误分配或释放其他不相关的内存块）。

---

### 3. **可能导致双重释放漏洞（Double-Free Vulnerability）**
- 在安全性方面，重复释放内存可能被攻击者利用，造成 **双重释放漏洞**，从而攻击程序。
- 攻击者可能通过精心设计的输入，操控内存分配器的数据结构，进而引发程序崩溃或劫持程序控制流。

---

### 4. **未定义行为的影响**
- C 语言标准没有明确定义重复释放会导致什么后果，因此其行为是 **未定义的**。
- 可能出现的后果包括：
  - 程序直接崩溃（例如，在某些平台上，内存管理器检测到双重释放时会报错）。
  - 程序运行出现逻辑错误，产生不可预测的结果。
  - 在某些情况下，可能看似没有问题（特别是在调试模式下），但生产环境可能会出现不可预知的问题。

---

### 如何避免重复释放？
1. **释放后置空指针**
   - 释放内存后将指针显式地设置为 `NULL`。
     ```c
     free(p);
     p = NULL;  // 避免悬空指针和重复释放
     ```
   - 因为 `free(NULL)` 是合法操作，且不会引发任何问题。

2. **规范化内存管理**
   - 确保每块动态分配的内存只有一个明确的“所有者”来负责释放。
   - 遵循严格的资源管理逻辑，避免多个地方同时操作同一块内存。

3. **工具检测**
   - 使用工具（如 Valgrind）来检测内存问题，包括重复释放和未释放的内存。

---

### 总结
`free(p)` 不能被调用两次或两次以上的原因在于内存管理器无法处理重复释放，可能导致内存管理器的数据结构被破坏或引发未定义行为。通过良好的编程习惯（如释放后置空指针）和内存检测工具，可以有效避免这类问题。
