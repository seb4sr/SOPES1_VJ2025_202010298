#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>

MODULE_LICENSE("GPL");
MODULE_AUTHOR("s3r");
MODULE_DESCRIPTION("Modulo que muestra el estado de los procesos del sistema");
MODULE_VERSION("1.0");

#define PROC_NAME "procesos_202010298"

static int procesos_show(struct seq_file *m, void *v) {
    struct task_struct *task;
    int total = 0;
    int corriendo = 0;
    int durmiendo = 0;
    int zombie = 0;
    int parado = 0;

    for_each_process(task) {
        total++;
        switch (task->__state) {
            case TASK_RUNNING:
                corriendo++;
                break;
            case TASK_INTERRUPTIBLE:
            case TASK_UNINTERRUPTIBLE:
                durmiendo++;
                break;
            case __TASK_STOPPED:
            case TASK_STOPPED:
                parado++;
                break;
            case EXIT_ZOMBIE:
                zombie++;
                break;
            default:
                break;
        }
    }

    seq_printf(m, "{\n");
    seq_printf(m, "  \"procesos_corriendo\": %d,\n", corriendo);
    seq_printf(m, "  \"total_procesos\": %d,\n", total);
    seq_printf(m, "  \"procesos_durmiendo\": %d,\n", durmiendo);
    seq_printf(m, "  \"procesos_zombie\": %d,\n", zombie);
    seq_printf(m, "  \"procesos_parados\": %d\n", parado);
    seq_printf(m, "}\n");

    return 0;
}

static int procesos_open(struct inode *inode, struct file *file) {
    return single_open(file, procesos_show, NULL);
}

static const struct proc_ops procesos_ops = {
    .proc_open = procesos_open,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_release = single_release,
};

static int __init procesos_modulo_init(void) {
    proc_create(PROC_NAME, 0, NULL, &procesos_ops);
    printk(KERN_INFO "Modulo de procesos cargado correctamente.\n");
    return 0;
}

static void __exit procesos_modulo_exit(void) {
    remove_proc_entry(PROC_NAME, NULL);
    printk(KERN_INFO "Modulo de procesos descargado correctamente.\n");
}

module_init(procesos_modulo_init);
module_exit(procesos_modulo_exit);
