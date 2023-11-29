use super::Fp;

pub type Main = Box<dyn Fn(&[Fp]) -> Box<dyn Fn()>>;

pub fn main_of_js(main: Box<dyn Fn(&[Fp]) -> ()>) -> Main {
    Box::new(|public_input| Box::new(|| main(public_input)))
}
