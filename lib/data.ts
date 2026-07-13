import { Post, Moment } from './types';

export const featuredPosts: Post[] = [
  {
    id: '1',
    type: 'project',
    title: '倒立摆仿真控制',
    slug: 'inverted-pendulum',
    excerpt: 'MATLAB/Simulink 实现级联 PID 与模糊自整定 PID 对比，重点排查 `ΔKi` 输出异常问题。',
    content: '',
    tags: ['控制系统', 'MATLAB', 'PID'],
    author: { id: 'me', name: 'Petrichor' },
    pinned: true,
    createdAt: '2026-06-20',
  },
  {
    id: '2',
    type: 'essay',
    title: '调试的第一百种方式',
    slug: 'debugging-ways',
    excerpt: '关于耐心，关于反复失败又重新开始的一些碎碎念，写给同样在深夜改代码的人。',
    content: '',
    tags: ['随笔', '调试'],
    author: { id: 'me', name: 'Petrichor' },
    pinned: true,
    createdAt: '2026-06-15',
  },
  {
    id: '3',
    type: 'essay' as const,
    title: '今天又调了一天参数',
    slug: '',
    excerpt: '`ΔKi` 又平了，明天继续查。',
    content: '',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-09',
  },
];

export const projects: Post[] = [
  {
    id: 'p1',
    type: 'project',
    title: '倒立摆仿真控制',
    slug: 'inverted-pendulum',
    excerpt: 'MATLAB/Simulink 实现级联 PID 与模糊自整定 PID 对比，重点排查 ΔKi 输出异常问题。',
    content: `## 背景

倒立摆是控制理论中的经典问题，也是我研究生阶段接触的第一个完整仿真项目。本文记录了我用 MATLAB/Simulink 搭建倒立摆模型，并实现两种控制策略的过程。

## 系统建模

倒立摆系统由小车、摆杆和导轨组成。通过拉格朗日方程推导非线性动力学方程：

\`\`\`matlab
% 系统参数
M = 0.5;   % 小车质量 (kg)
m = 0.2;   % 摆杆质量 (kg)
L = 0.3;   % 摆杆长度 (m)
g = 9.8;   % 重力加速度 (m/s²)

% 状态空间矩阵
A = [0, 1, 0, 0;
     0, 0, -(m*g)/M, 0;
     0, 0, 0, 1;
     0, 0, (M+m)*g/(M*L), 0];
B = [0; 1/M; 0; -1/(M*L)];
C = eye(4);
D = [0; 0; 0; 0];
\`\`\`

## 级联 PID 控制

首先实现了传统的级联 PID 控制方案：外环控制摆杆角度，内环控制小车位置。关键代码段：

\`\`\`matlab
% 外环：角度控制
theta_error = theta_ref - theta;
u_angle = Kp_theta * theta_error + Ki_theta * integral_theta + Kd_theta * derivative_theta;

% 内环：位置控制
pos_error = u_angle - x;
u = Kp_pos * pos_error + Ki_pos * integral_pos + Kd_pos * derivative_pos;
\`\`\`

## 模糊自整定 PID

为了改善系统在不同工况下的表现，引入了模糊自整定 PID。核心思路是根据误差和误差变化率实时调整 PID 参数。

遇到的问题：ΔKi 在特定工况下输出异常，经过排查发现是模糊规则表中几个边角规则的定义冲突导致。通过调整隶属度函数的重叠区域解决了此问题。

## 仿真结果对比

在阶跃响应测试中，模糊自整定 PID 相比传统级联 PID：调节时间缩短了约 35%，超调量降低了约 20%。

## 总结

这次仿真实践加深了我对控制理论的理解。后续计划在实物平台上验证仿真结果。`,
    tags: ['控制系统', 'MATLAB', 'PID', '模糊控制'],
    author: { id: 'me', name: 'Petrichor' },
    pinned: true,
    createdAt: '2026-06-20',
  },
  {
    id: 'p2',
    type: 'project',
    title: 'ROS 2 移动机器人开发',
    slug: 'ros2-mobile-robot',
    excerpt: '基于 ROS 2 Humble 搭建四轮差速底盘，实现 SLAM 建图与自主导航。',
    content: '',
    tags: ['ROS 2', '机器人', 'SLAM', '嵌入式'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-05-10',
  },
  {
    id: 'p3',
    type: 'project',
    title: '基于 ESP32 的智能家居网关',
    slug: 'esp32-gateway',
    excerpt: '从零搭建物联网网关，支持 BLE + WiFi 双模通信，MQTT 对接 Home Assistant。',
    content: '',
    tags: ['ESP32', 'IoT', 'MQTT', '嵌入式'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-04-22',
  },
  {
    id: 'p4',
    type: 'project',
    title: 'STM32 电机 FOC 驱动板设计',
    slug: 'stm32-foc-driver',
    excerpt: '基于 STM32G431 的 BLDC 电机 FOC 驱动方案，从硬件设计到软件调试全流程记录。',
    content: '',
    tags: ['STM32', 'FOC', 'PCB', '电机控制'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-03-15',
  },
  {
    id: 'p5',
    type: 'project',
    title: '个人博客站点搭建',
    slug: 'blog-site',
    excerpt: 'Next.js + Supabase + Vercel 全栈部署，深色终端美学，支持代码高亮与 Markdown 渲染。',
    content: '',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-01',
  },
];

export const essays: Post[] = [
  {
    id: 'e1',
    type: 'essay',
    title: '调试的第一百种方式',
    slug: 'debugging-ways',
    excerpt: '关于耐心，关于反复失败又重新开始的一些碎碎念，写给同样在深夜改代码的人。',
    content: `有时我觉得调试就像一场和自己的对话。

出错、排查、假设、验证、推翻、重来——这套流程走了无数遍，却每次都能发现新的盲区。那个 ΔKi 输出异常的问题，我前后花了三天。第一天怀疑是积分饱和，加了 anti-windup，还是不对。第二天怀疑是微分项噪声放大，换了滤波器，依然异常。第三天重新回到模糊规则表，才发现是两条规则的隶属度重叠区域设计不当。

这个时候你已经离答案很近了，但你还不知道。你只知道你又排除了一种可能，又往前走了一步。这种不知道终点在哪儿但知道方向没错的感觉，大概是调试最迷人的地方。

凌晨两点，万用表的探针夹在电路板旁边，示波器还开着。室友睡了，整个楼都安静。只有散热风扇在转。我盯着波形看了一会儿，突然意识到那个异常的形状，跟模糊规则表的某个边角区域完全吻合。改了隶属度函数，重跑仿真，波形平滑了。

这时候你会觉得三天值了。不是因为解决了问题——虽然那也挺爽——而是因为你真的理解了为什么它出问题。那种从「大概懂了」到「确实懂了」的跨越，是从焦虑到平静的转变。

如果你也在深夜改代码，我想说：你不是一个人。那些反复推翻的假设，那些查了又查的手册，那些对着示波器发呆的凌晨，都算数。`,
    tags: ['调试', '感悟', '深夜'],
    author: { id: 'me', name: 'Petrichor' },
    pinned: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'e2',
    type: 'essay',
    title: '工科生的读书困境',
    slug: 'engineering-reading',
    excerpt: '技术书读了不少，但翻开人文书的次数越来越少了——试着找回阅读的广度。',
    content: '',
    tags: ['阅读', '思考'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-05-28',
  },
  {
    id: 'e3',
    type: 'essay',
    title: '从实验室到产业：一个机器人工程师的职业选择',
    slug: 'lab-to-industry',
    excerpt: '毕业季的困惑：继续读博做研究，还是进入工业界做产品？一些不成熟的想法。',
    content: '',
    tags: ['职业', '机器人'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-05-05',
  },
  {
    id: 'e4',
    type: 'essay',
    title: '动手的乐趣：为什么我选择做一个会写代码的硬件工程师',
    slug: 'joy-of-making',
    excerpt: '软件和硬件之间有一道迷人的缝隙，我喜欢站在那个位置上。',
    content: '',
    tags: ['个人成长', '硬件', '软件'],
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-04-10',
  },
];

export const moments: Moment[] = [
  {
    id: 'm1',
    content: 'ΔKi 又平了，明天继续查。已经排除积分饱和，怀疑模糊规则表边角区域有冲突。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-09T23:15:00',
  },
  {
    id: 'm2',
    content: '今天在 GitHub 上看到一个离谱的 issue，有人用倒立摆模型跑强化学习，reward 函数写错了，摆了三天三夜摆不起来。评论区经典回复："你的 agent 在数学上已经放弃了。"',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-08T21:30:00',
  },
  {
    id: 'm3',
    content: '把 ROS 2 的 SLAM 调通了，建图效果比预想的要好。下周加上导航模块。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-07T18:20:00',
  },
  {
    id: 'm4',
    content: '读完了《深入理解 Linux 内核》，内核调度那章值得再读一遍。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-06T22:00:00',
  },
  {
    id: 'm5',
    content: '新到的 STM32G431 开发板到了，迫不及待想试试硬件 FOC。周末有的忙了。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-04T15:45:00',
  },
  {
    id: 'm6',
    content: '换了编辑器主题，发现不管怎么换，最后都会调回 Monokai。这大概就是舒适区吧。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-02T11:10:00',
  },
  {
    id: 'm7',
    content: '用 Tailscale 搭了个远程实验室访问通道，终于可以在家也能连实验室的示波器了。不过延迟不太理想，考虑换 ZeroTier 试试。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-07-01T20:30:00',
  },
  {
    id: 'm8',
    content: '毕业典礼结束，学生时代的最后一张合影。致谢里写了：「感谢那些凌晨三点陪我 debug 的示波器和散热风扇。」',
    imageUrl: '/images/grad.jpg',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-06-28T16:00:00',
  },
  {
    id: 'm9',
    content: '试图用 ChatGPT 帮我写控制器的 stability proof，它证到一半开始胡说八道。好吧，数学还是得自己来。',
    author: { id: 'me', name: 'Petrichor' },
    createdAt: '2026-06-25T23:50:00',
  },
];
