import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Answer {
  [key: string]: string;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const { toast } = useToast();

  const questions = [
    {
      id: 'company_name',
      question: 'Название вашего хозяйства/предприятия',
      type: 'text',
      placeholder: 'Введите название'
    },
    {
      id: 'region',
      question: 'Регион, в котором вы работаете',
      type: 'text',
      placeholder: 'Укажите регион'
    },
    {
      id: 'farm_size',
      question: 'Какова площадь ваших земель? (га)',
      type: 'text',
      placeholder: 'Укажите площадь в гектарах'
    },
    {
      id: 'main_crops',
      question: 'Какие основные культуры вы выращиваете?',
      type: 'textarea',
      placeholder: 'Опишите основные культуры'
    },
    {
      id: 'fertilizer_experience',
      question: 'Какой у вас опыт работы в сельском хозяйстве?',
      type: 'textarea',
      placeholder: 'Расскажите о вашем опыте'
    },
    {
      id: 'current_fertilizers',
      question: 'Какие удобрения вы используете в настоящее время?',
      type: 'textarea',
      placeholder: 'Перечислите используемые удобрения'
    },
    {
      id: 'fertilizer_satisfaction',
      question: 'Насколько вы удовлетворены текущими удобрениями?',
      type: 'radio',
      options: ['Полностью удовлетворён', 'Частично удовлетворён', 'Не удовлетворён', 'Затрудняюсь ответить']
    },
    {
      id: 'fertilizer_problems',
      question: 'С какими проблемами вы сталкиваетесь при использовании удобрений?',
      type: 'textarea',
      placeholder: 'Опишите проблемы, если есть'
    },
    {
      id: 'fertilizer_budget',
      question: 'Какой бюджет вы выделяете на удобрения в год?',
      type: 'textarea',
      placeholder: 'Укажите примерный бюджет'
    },
    {
      id: 'organic_preference',
      question: 'Интересуют ли вас органические удобрения?',
      type: 'radio',
      options: ['Да, активно использую', 'Да, интересуют', 'Нет', 'Затрудняюсь ответить']
    },
    {
      id: 'sapropel_knowledge',
      question: 'Слышали ли вы о сапропеле как удобрении?',
      type: 'radio',
      options: ['Да, знаю хорошо', 'Да, слышал(а)', 'Нет, не слышал(а)']
    },
    {
      id: 'sapropel_experience',
      question: 'Использовали ли вы когда-либо сапропель?',
      type: 'textarea',
      placeholder: 'Расскажите о вашем опыте использования сапропеля'
    },
    {
      id: 'sapropel_interest',
      question: 'Заинтересовались бы вы использованием сапропеля в качестве удобрения?',
      type: 'radio',
      options: ['Да, очень интересно', 'Да, хотел(а) бы узнать больше', 'Нет', 'Затрудняюсь ответить']
    },
    {
      id: 'sapropel_concerns',
      question: 'Какие у вас есть опасения или вопросы по поводу использования сапропеля?',
      type: 'textarea',
      placeholder: 'Опишите ваши опасения или вопросы'
    },
    {
      id: 'important_factors',
      question: 'Какие факторы для вас наиболее важны при выборе удобрения?',
      type: 'textarea',
      placeholder: 'Например: цена, эффективность, экологичность и т.д.'
    },
    {
      id: 'price_expectations',
      question: 'Какую цену вы считаете приемлемой для органического удобрения на основе сапропеля?',
      type: 'textarea',
      placeholder: 'Укажите примерную цену'
    },
    {
      id: 'purchase_volume',
      question: 'В каких объёмах вы могли бы закупать удобрение?',
      type: 'textarea',
      placeholder: 'Укажите примерный объём'
    },
    {
      id: 'supplier_requirements',
      question: 'Какие требования вы предъявляете к поставщикам удобрений?',
      type: 'textarea',
      placeholder: 'Опишите ваши требования'
    },
    {
      id: 'innovation_openness',
      question: 'Насколько вы открыты к внедрению новых видов удобрений?',
      type: 'radio',
      options: ['Очень открыт(а)', 'Открыт(а), но с осторожностью', 'Не особо открыт(а)', 'Предпочитаю проверенные методы']
    },
    {
      id: 'additional_comments',
      question: 'Есть ли что-то ещё, что вы хотели бы добавить?',
      type: 'textarea',
      placeholder: 'Ваши дополнительные комментарии'
    }
  ];

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Ответы:', answers);
    toast({
      title: "Спасибо за участие!",
      description: "Ваши ответы успешно сохранены.",
    });
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  if (currentStep === -1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8 text-center relative">
            <div className="absolute inset-0 bg-cover bg-center opacity-20 rounded-3xl" 
                 style={{ backgroundImage: 'url(https://cdn.poehali.dev/projects/62bdc05f-571e-4f88-b8fb-309c24dfcfbc/files/73ea44f9-4713-489d-9b72-3b8198167d56.jpg)' }}>
            </div>
            <div className="relative z-10 py-12">
              <Icon name="Sprout" className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h1 className="text-4xl font-bold text-primary mb-4">Исследование рынка удобрений</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Для сельскохозяйственных предприятий и фермеров
              </p>
            </div>
          </div>

          <Card className="shadow-lg border-2 border-primary/10">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-2xl text-primary">Добро пожаловать!</CardTitle>
              <CardDescription className="text-base leading-relaxed">
                Мы проводим исследование с целью узнать ваше мнение о различных видах удобрений, 
                используемых в сельском хозяйстве. Ваши ответы помогут нам лучше понять потребности 
                аграрного сектора и оценить перспективы использования органических удобрений, 
                в частности сапропеля.
              </CardDescription>
              <div className="flex items-start gap-3 text-left bg-accent/10 p-4 rounded-lg">
                <Icon name="Info" className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Опрос займёт около 10-15 минут</p>
                  <p>Большинство вопросов предполагают развёрнутые ответы</p>
                  <p>Все данные конфиденциальны и используются только в исследовательских целях</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                onClick={() => setCurrentStep(0)} 
                size="lg"
                className="w-full max-w-md"
              >
                Начать опрос
                <Icon name="ArrowRight" className="ml-2 w-5 h-5" />
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 flex justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Leaf" className="w-4 h-4 text-accent" />
              <span>Экологично</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="TrendingUp" className="w-4 h-4 text-accent" />
              <span>Эффективно</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Heart" className="w-4 h-4 text-accent" />
              <span>Натурально</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary">
              Вопрос {currentStep + 1} из {questions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="shadow-lg border-2 border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl text-primary flex items-start gap-3">
              <Icon name="MessageSquare" className="w-6 h-6 mt-1 flex-shrink-0 text-accent" />
              <span>{currentQuestion.question}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentQuestion.type === 'text' && (
              <div className="space-y-2">
                <Input
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  className="border-primary/20 focus:border-primary"
                />
              </div>
            )}

            {currentQuestion.type === 'textarea' && (
              <div className="space-y-2">
                <Textarea
                  placeholder={currentQuestion.placeholder}
                  value={answers[currentQuestion.id] || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                  rows={5}
                  className="border-primary/20 focus:border-primary resize-none"
                />
              </div>
            )}

            {currentQuestion.type === 'radio' && currentQuestion.options && (
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/5 transition-colors border border-transparent hover:border-primary/20">
                    <RadioGroupItem value={option} id={`${currentQuestion.id}-${index}`} />
                    <Label 
                      htmlFor={`${currentQuestion.id}-${index}`}
                      className="cursor-pointer flex-1 font-normal"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <Icon name="ArrowLeft" className="mr-2 w-4 h-4" />
                Назад
              </Button>
              
              {currentStep < questions.length - 1 ? (
                <Button
                  onClick={handleNext}
                  className="flex-1"
                >
                  Далее
                  <Icon name="ArrowRight" className="ml-2 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-accent hover:bg-accent/90"
                >
                  Завершить опрос
                  <Icon name="Check" className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <img 
            src="https://cdn.poehali.dev/projects/62bdc05f-571e-4f88-b8fb-309c24dfcfbc/files/5f2f6e1b-cc4b-4f2f-a570-c66c59601960.jpg"
            alt="Сапропель"
            className="w-full h-48 object-cover rounded-lg shadow-md opacity-40"
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
