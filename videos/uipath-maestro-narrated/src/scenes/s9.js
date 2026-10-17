// ===================== 9 · Choosing =====================
enter("s9");
prep("#cv9");
tl.set("#au9, #or9, #au9a, #au9b, #or9a, #or9b, #eo9, #cn9, #sm9, #nr9", { opacity: 0 }, 0);
show("#au9", W("s9b", 1), { y: 30, s: 0.9, d: 0.7 });
show("#au9a", W("s9b", 6), { y: 14, s: 0.7, d: 0.4 }); show("#au9b", W("s9b", 11), { y: 14, s: 0.7, d: 0.4 });
show("#or9", W("s9c", 1), { y: 30, s: 0.9, d: 0.7 });
show("#or9a", W("s9c", 6), { y: 14, s: 0.7, d: 0.4 }); show("#or9b", W("s9c", 10), { y: 14, s: 0.7, d: 0.4 });
show("#eo9", W("s9d", 3), { y: 14, s: 0.7, d: 0.5 }); shake("#eo9", W("s9d", 3) + 0.6, 6);
draw("#cv9", W("s9d", 7), 1.4);
show("#cn9", W("s9d", 9), { y: 14, s: 0.7, d: 0.5 });
show("#sm9", W("s9dx", 0), { y: 14, s: 0.7, d: 0.5 }); pulse("#sm9", W("s9dx", 2), 1.08);
show("#nr9", W("s9dx", 6), { y: 14, s: 0.7, d: 0.5 });
leave("s9");
