#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("s3r");
MODULE_DESCRIPTION("Modulo CPU segun librerías permitidas");
MODULE_VERSION("1.0");

#define PROC_NAME "cpu_202010298"

static int cpu_show(struct seq_file *m, void *v) {
    struct task_struct *task;
    int procesos = 0;
    int en_ejecucion = 0;
    int porcentaje_estimado = 0;

    for_each_process(task) {
        procesos++;
        if (task->__state == TASK_RUNNING)
            en_ejecucion++;
    }

    if (procesos > 0)
        porcentaje_estimado = (en_ejecucion * 100) / procesos;

    seq_printf(m, "{\n");
    seq_printf(m, "  \"procesos_totales\": %d,\n", procesos);
    seq_printf(m, "  \"procesos_ejecucion\": %d,\n", en_ejecucion);
    seq_printf(m, "  \"uso_cpu_estimado\": %d,\n", porcentaje_estimado);
    seq_printf(m, "  \"numero_cpus\": %d\n", num_possible_cpus());
    seq_printf(m, "}\n");

    return 0;
}

static int cpu_open(struct inode *inode, struct file *file) {
    return single_open(file, cpu_show, NULL);
}

static const struct proc_ops cpu_ops = {
    .proc_open = cpu_open,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_release = single_release,
};

static int __init mi_cpu_modulo_init(void) {
    proc_create(PROC_NAME, 0, NULL, &cpu_ops);
    printk(KERN_INFO "Modulo CPU cargado\n");
    return 0;
}

static void __exit mi_cpu_modulo_exit(void) {
    remove_proc_entry(PROC_NAME, NULL);
    printk(KERN_INFO "Modulo CPU descargado\n");
}

module_init(mi_cpu_modulo_init);
module_exit(mi_cpu_modulo_exit);
